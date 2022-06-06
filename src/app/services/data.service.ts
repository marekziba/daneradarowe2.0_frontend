import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import BaseLayer from 'ol/layer/Base';
import ImageLayer from 'ol/layer/Image';

import { interval, timer, Observable, Subject, Subscription, map, tap } from 'rxjs';
import { Image } from '../models/Image.model';
import { Product } from '../models/Product.model';
import { ProductGroup } from '../models/ProductGroup.model';
import { ProductVariant } from '../models/ProductVariant.model';
import { Radar } from '../models/Radar.model';
import { Scan } from '../models/Scan.model';
import { BaseProviderService } from './base-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseProviderService {
  // state attributes
  private selectedRadar?: Radar = undefined;
  private selectedScan?: Scan = undefined;
  private selectedProduct?: Product = undefined;
  private _currentImage: Image = undefined;

  // private colorScale: string[] = ['#0000c7', '#0034fe', '#0079fe', '#1aa2fe', '#53d0fe', '#86f0fe', '#fefefe', '#fef7c0', '#fee500', '#febc00', '#fe7300', '#fe3f00', '#c70000', '#a00000', '#800000', '#be0078', '#e600aa', '#ff28dc'];
  private colorScale: string[] = ['rgb(115,77,172)', 'rgb(115,78,168)', 'rgb(115,79,165)', 'rgb(115,81,162)', 'rgb(116,82,158)', 'rgb(116,84,155)', 'rgb(116,85,152)', 'rgb(117,86,148)', 'rgb(117,88,145)', 'rgb(117,89,142)', 'rgb(118,91,138)', 'rgb(118,92,135)', 'rgb(118,94,132)', 'rgb(119,95,128)', 'rgb(119,96,125)', 'rgb(119,98,122)', 'rgb(120,99,118)', 'rgb(120,101,115)', 'rgb(120,102,112)', 'rgb(121,103,108)', 'rgb(121,105,105)', 'rgb(121,106,102)', 'rgb(122,108,98)', 'rgb(122,109,95)', 'rgb(122,111,92)', 'rgb(123,112,88)', 'rgb(123,113,85)', 'rgb(123,115,82)', 'rgb(124,116,78)', 'rgb(124,118,75)', 'rgb(124,119,72)', 'rgb(125,121,69)', 'rgb(127,123,72)', 'rgb(129,125,75)', 'rgb(131,127,79)', 'rgb(133,130,82)', 'rgb(135,132,85)', 'rgb(137,134,89)', 'rgb(139,137,92)', 'rgb(141,139,96)', 'rgb(144,141,99)', 'rgb(146,144,102)', 'rgb(148,146,106)', 'rgb(150,148,109)', 'rgb(152,151,113)', 'rgb(154,153,116)', 'rgb(156,155,119)', 'rgb(158,158,123)', 'rgb(161,160,126)', 'rgb(163,162,130)', 'rgb(165,165,133)', 'rgb(167,167,136)', 'rgb(169,169,140)', 'rgb(171,172,143)', 'rgb(173,174,147)', 'rgb(175,176,150)', 'rgb(178,179,154)', 'rgb(173,175,153)', 'rgb(168,171,152)', 'rgb(163,167,151)', 'rgb(158,163,150)', 'rgb(154,159,149)', 'rgb(149,155,148)', 'rgb(144,151,147)', 'rgb(139,147,146)', 'rgb(135,144,145)', 'rgb(130,140,144)', 'rgb(125,136,143)', 'rgb(120,132,142)', 'rgb(115,128,142)', 'rgb(111,124,141)', 'rgb(106,120,140)', 'rgb(101,116,139)', 'rgb(96,112,138)', 'rgb(92,109,137)', 'rgb(87,105,136)', 'rgb(82,101,135)', 'rgb(77,97,134)', 'rgb(73,93,133)', 'rgb(68,89,132)', 'rgb(63,85,131)', 'rgb(58,81,130)', 'rgb(54,78,130)', 'rgb(55,81,132)', 'rgb(57,85,134)', 'rgb(59,89,136)', 'rgb(61,93,138)', 'rgb(63,97,141)', 'rgb(65,101,143)', 'rgb(67,105,145)', 'rgb(69,109,147)', 'rgb(71,113,149)', 'rgb(73,117,152)', 'rgb(74,121,154)', 'rgb(76,125,156)', 'rgb(78,129,158)', 'rgb(80,133,160)', 'rgb(82,137,163)', 'rgb(84,141,165)', 'rgb(86,145,167)', 'rgb(88,149,169)', 'rgb(90,153,171)', 'rgb(92,157,174)', 'rgb(76,165,142)', 'rgb(60,173,110)', 'rgb(45,182,78)', 'rgb(42,175,72)', 'rgb(39,169,67)', 'rgb(37,163,62)', 'rgb(34,156,56)', 'rgb(31,150,51)', 'rgb(29,144,46)', 'rgb(26,137,40)', 'rgb(24,131,35)', 'rgb(21,125,30)', 'rgb(18,118,24)', 'rgb(16,112,19)', 'rgb(13,106,14)', 'rgb(11,100,9)', 'rgb(35,115,8)', 'rgb(59,130,7)', 'rgb(83,145,6)', 'rgb(107,161,5)', 'rgb(131,176,4)', 'rgb(155,191,3)', 'rgb(179,207,2)', 'rgb(203,222,1)', 'rgb(227,237,0)', 'rgb(252,253,0)', 'rgb(248,248,0)', 'rgb(244,243,0)', 'rgb(241,238,0)', 'rgb(237,233,0)', 'rgb(233,228,0)', 'rgb(230,223,0)', 'rgb(226,218,0)', 'rgb(222,213,0)', 'rgb(219,208,0)', 'rgb(215,203,0)', 'rgb(211,198,0)', 'rgb(208,193,0)', 'rgb(204,188,0)', 'rgb(200,183,0)', 'rgb(197,179,0)', 'rgb(250,148,0)', 'rgb(246,144,0)', 'rgb(242,141,1)', 'rgb(238,138,1)', 'rgb(234,135,2)', 'rgb(231,132,3)', 'rgb(227,129,3)', 'rgb(223,126,4)', 'rgb(219,123,5)', 'rgb(215,120,5)', 'rgb(212,116,6)', 'rgb(208,113,6)', 'rgb(204,110,7)', 'rgb(200,107,8)', 'rgb(196,104,8)', 'rgb(193,101,9)', 'rgb(189,98,10)', 'rgb(185,95,10)', 'rgb(181,92,11)', 'rgb(178,89,12)', 'rgb(249,35,11)', 'rgb(242,35,12)', 'rgb(236,35,13)', 'rgb(230,35,14)', 'rgb(223,36,15)', 'rgb(217,36,16)', 'rgb(211,36,17)', 'rgb(205,36,18)', 'rgb(198,37,19)', 'rgb(192,37,20)', 'rgb(186,37,22)', 'rgb(180,37,23)', 'rgb(173,38,24)', 'rgb(167,38,25)', 'rgb(161,38,26)', 'rgb(155,38,27)', 'rgb(148,39,28)', 'rgb(142,39,29)', 'rgb(136,39,30)', 'rgb(130,40,32)', 'rgb(202,153,180)', 'rgb(201,146,176)', 'rgb(201,139,173)', 'rgb(200,133,169)', 'rgb(200,126,166)', 'rgb(199,120,162)', 'rgb(199,113,159)', 'rgb(199,106,155)', 'rgb(198,100,152)', 'rgb(198,93,148)', 'rgb(197,87,145)', 'rgb(197,80,141)', 'rgb(196,74,138)', 'rgb(196,67,134)', 'rgb(196,60,131)', 'rgb(195,54,127)', 'rgb(195,47,124)', 'rgb(194,41,120)', 'rgb(194,34,117)', 'rgb(194,28,114)', 'rgb(154,36,224)', 'rgb(149,34,219)', 'rgb(144,33,215)', 'rgb(139,32,210)', 'rgb(134,31,206)', 'rgb(129,30,201)', 'rgb(124,29,197)', 'rgb(120,28,193)', 'rgb(115,27,188)', 'rgb(110,26,184)', 'rgb(105,24,179)', 'rgb(100,23,175)', 'rgb(95,22,170)', 'rgb(91,21,166)', 'rgb(86,20,162)', 'rgb(81,19,157)', 'rgb(76,18,153)', 'rgb(71,17,148)', 'rgb(66,16,144)', 'rgb(62,15,140)', 'rgb(132,253,255)'];
  // private colorScale: string[] = ['#ff0084', '#f90084', '#f30085', '#ed0086', '#e70087', '#e10188', '#db0189', '#d40189', '#ce018a', '#c8018b', '#c2028c', '#bc028d', '#b6028e', '#af028e', '#a9028f', '#a30390', '#9d0391', '#970392', '#910393', '#8a0393', '#840494', '#7e0495', '#780496', '#720497', '#6c0498', '#5d0599', '#550599', '#4d0499', '#450499', '#3d0399', '#340399', '#2c0399', '#240299', '#1c0299', '#160299', '#160c9c', '#1717a0', '#1822a3', '#192ca7', '#1a37aa', '#1b42ae', '#1c4cb1', '#1d57b5', '#1e62b8', '#1f6cbc', '#2077c0', '#2182c3', '#228cc7', '#2397ca', '#24a2ce', '#25acd1', '#26b7d5', '#27c2d8', '#28ccdc', '#30e0e3', '#34e0e3', '#3ae0e3', '#41e1e4', '#47e2e5', '#4ee2e5', '#54e3e6', '#5be4e7', '#61e5e8', '#68e5e8', '#6ee6e9', '#75e7ea', '#7be7ea', '#82e8eb', '#88e9ec', '#8feaed', '#95eaed', '#9cebee', '#a2ecef', '#a9ecef', '#afedf0', '#b6eef1', '#a7f1da', '#9af2c8', '#8cf3b5', '#7ff5a3', '#71f690', '#64f77e', '#57f86c', '#49fa59', '#3cfb47', '#2efc34', '#21fd22', '#03fa03', '#03f503', '#03f003', '#03ea03', '#03e503', '#03e003', '#03db03', '#03d503', '#03d003', '#03cb03', '#03c603', '#03c003', '#03bb03', '#03b603', '#03b103', '#02ab02', '#02a602', '#02a102', '#029c02', '#029602', '#029102', '#028c02', '#028702', '#028102', '#027c02', '#027702', '#027202', '#026c02', '#026702', '#056603', '#4e794c', '#527a50', '#567c54', '#5a7d58', '#5e7e5c', '#628060', '#668164', '#6a8268', '#6e846c', '#728570', '#6e846c', '#8a7676', '#8a7281', '#8a6c7a', '#896673', '#885f6c', '#885965', '#87525e', '#864c56', '#85454f', '#853f48', '#843841', '#6e0000', '#730000', '#790000', '#7e0000', '#840001', '#890001', '#8f0001', '#950002', '#9a0002', '#a00002', '#a50003', '#ab0003', '#b00003', '#b60004', '#bc0004', '#c10004', '#c70004', '#cc0005', '#d20005', '#d70005', '#dd0006', '#e30006', '#e80006', '#ee0007', '#f30007', '#fa3751', '#fa3c59', '#fa4161', '#fa4769', '#fb4c71', '#fb527a', '#fb5782', '#fc5d8a', '#fc6292', '#fc689b', '#fc6da3', '#fd73ab', '#fd78b3', '#fd7ebc', '#fe83c4', '#fe89cc', '#ff8cd5', '#ff95d0', '#ff9fcb', '#ffa8c6', '#ffb2c1', '#ffbbbc', '#ffc5b7', '#ffceb2', '#ffd8ad', '#ffe1a8', '#ffe8a3', '#ffe49f', '#ffe09b', '#ffdb97', '#ffd793', '#ffd38e', '#ffce8a', '#ffca86', '#ffc582', '#ffc17d', '#ffbd79', '#ffb875', '#ffb471', '#ffb06c', '#ffab68', '#ffa764', '#ffa260', '#ff9e5b', '#ff9a57', '#ff9553', '#ff8a4f', '#fc874e', '#f8844c', '#f5814a', '#f17e48', '#ee7b47', '#ea7845', '#e77543', '#e37241', '#e06f3f', '#dc6c3e', '#d8683c', '#d5653a', '#d16238', '#ce5f36', '#ca5c35', '#c75933', '#c35631', '#c0532f', '#bc502d', '#b94d2c', '#b54a2a', '#b14628', '#ae4326', '#aa4024', '#a73d23', '#a33a21', '#a0371f', '#9c341d', '#99311b', '#952e1a', '#922b18', '#8e2816', '#8a2414', '#872112', '#831e11', '#801b0f', '#7c180d', '#79150b', '#751209', '#720f08', '#6e0c06', '#6b0904', '#670602'];

  dataSource = new Subject<Image[]>();
  radarChanged = new Subject<Radar>();
  imageChanged = new Subject<Image>();

  constructor(private http: HttpClient) { super() }

  public set currentImage(image: Image) {
    this.imageChanged.next(image);
    this._currentImage = image;
  }

  public get currentImage() { return this._currentImage; }

  public set scan(scan: Scan) {
    this.selectedScan = scan;
  }

  public set radar(radar: Radar){
    this.selectedRadar = radar;
    this.radarChanged.next(radar);
  }

  public set product(product: Product){
    this.product = product;
  }

  public getColorScale(): string[] {
    return this.colorScale;
  }

  public requestData(): Observable<{}> {
    const radarId = this.selectedRadar ? this.selectedRadar.codeName : 'LEG';
    // const scanR = this.selectedScan.range;

    // return this.http.post('https://daneradarowe.pl/api/getData', {
    //   rstd: `${radarId}_125_dBZ_1_enh`,
    //   n: 12
    // });

    return this.http.get('https://localhost:8080/api/Images')
    .pipe(
      tap(
        (response) => console.log(response)
      ),
      map(
        (images: any) => images.map(
          (image: any) => plainToClass(Image, image, {excludeExtraneousValues: true})
        )
      )
    );
  }

  getProducts(): Observable<ProductGroup[]> {
    return this.http.get('https://localhost:8080/api/Products?radarId=2').pipe(
      map(
        (products: any) => {
          let groupedProducts = products.map(
            (product) => plainToClass(Product, product, {excludeExtraneousValues: true})
          ).reduce((grouped: {}, item: Product) => {
            const group = (grouped[item.productType] || []);
            item.variants = item.variants.sort((pv1, pv2) => ProductVariant.compare(pv1, pv2))
            group.push(item);
            grouped[item.productType] = group;
            return grouped;
          }, {});
          groupedProducts = Object.entries(groupedProducts).map(([key, value]) => {
            return plainToClass(ProductGroup, {name: key, products: value})
          })
          return groupedProducts;
        }
      ),
      tap((grouped) => console.log(grouped))
    )
  }

  getLayer(): BaseLayer {
      return new ImageLayer();
  }
}
