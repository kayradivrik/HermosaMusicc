export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    title: "Müzik Sektöründe Dijitalleşme",
    excerpt: "Dijitalleşme, müzik yapımından dağıtımına kadar her aşamada devrim yarattı.",
    content: `
      <p>Müzik sektörü son on yılda devasa bir dönüşüm geçirdi. Fiziksel satışların yerini streaming platformları alırken, bağımsız sanatçılar için yeni kapılar açıldı.</p>
      <p>Hermosa Music olarak, sanatçılarımızın bu dijital denizde kaybolmamasını sağlıyoruz. Doğru strateji ve teknik altyapı ile sesinizi dünyaya duyuruyoruz.</p>
      <p>Web sitenizin tasarımı, sosyal medya yönetimi ve doğru reklam kampanyaları ile markanızı bir üst seviyeye taşıyabilirsiniz.</p>
    `,
    date: "12 Mayıs 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD5loPgne0onEA3YfdZY85YsRCBskpsNjKBsMX0mh78M0rc2dL1rDK_vur6Mnzq3djeG6Vjd8wBscATZHSszrD6_nYrx-vrWNc7r0pqt2nt-w8ve5aO2JbmKyBzkcnh9nogz28sLGRiNZ_RvoYIphK90o1OzACMSPQn56DyhsOdFR04vyI1x7JlwxECxvkOnzYQJQAKK41SJMnOgegjMlEabSrMsmHKNuhOu_nqWdF9Rq-TuYaT_UGozpE1ocGeVCKNS6tTl3YMSrz",
    category: "Sektör"
  },
  {
    id: "2",
    title: "Sosyal Medya ve Sanatçı Markası",
    excerpt: "Güçlü bir sosyal medya varlığı, modern sanatçılar için en kritik başarı faktörlerinden biridir.",
    content: `
      <p>Artık sadece iyi müzik yapmak yetmiyor. Sanatçıların aynı zamanda kendi hikayelerini anlatan birer marka olmaları gerekiyor.</p>
      <p>TikTok ve Instagram, yeni yeteneklerin keşfedilmesi için en güçlü araçlar haline geldi. Hermosa olarak bu platformları stratejik bir şekilde yönetiyoruz.</p>
    `,
    date: "10 Mayıs 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_EgAIJs5DKRQqAGK19JrbIc3tK6LH-mNcSEOHR_0vDK22BnLs2Ik5N2KSDuF7O_mUbkGGr4qthsbSU1rn-qQ0KcsnkXiwIAb5XlSXIPjaglFggC2TzumXpOjAaqy6oFp2IG2CMVpn5HNlOdlVBMIVsLjrVZdGFtQcon_9i_7TMzP5R0ItuBwSGHkCuS3Og2agzQZ0ZB3-lwTzHiOWjHNfgBOmCO46DWYu2jD4A-6EBk9sLA1iLN6t04Bk3bVGaf2P_0I8AYHy7QDH",
    category: "Marketing"
  },
  {
    id: "3",
    title: "Etkinlik Yönetiminde Yeni Trendler",
    excerpt: "Hibrit etkinlikler ve interaktif sahneler, eğlence dünyasının geleceğini şekillendiriyor.",
    content: `
      <p>Eğlence sektörü her zamankinden daha dinamik. Teknolojinin sahneye entegrasyonu, izleyici deneyimini bambaşka bir boyuta taşıyor.</p>
    `,
    date: "05 Mayıs 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4FTd1kPHRcLPIUs6z7kMaD3Dz8nGZ_YY0hq7gNRpFH9RuK8bbClvwTmQsfGn17UWD_7iQuRlZXHFAPnwrRkDpee6gLc16iehITc92dtpomKKPkE4HyCNUyKiBwFXSdA06cYl9wGj3tIsPX4aH-k0ixAy1g5nJbowCG2bePZW6vwmFp9b02XhJTrcuCWx9jAzhwHqX5PkqDf3bIdIngInAqracT1F98wkC8qw78n88OB1lGRfUD4BntR6RElal33V6-HX4X4llWw_E",
    category: "Events"
  }
];
