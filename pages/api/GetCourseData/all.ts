import type { NextApiRequest, NextApiResponse } from 'next';
const cheerio = require("cheerio");

type Data = {
  name: string,
  description: string,
  rating: string,
  students: string,
  features?: any,
  imgUrl: string,
  giftServicePrice: string,
  accountServicePrice: string,

  error?: any,
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  if (req.method === "POST") {

    try {
      const body = JSON.parse(req.body);

      const checkCoursedUrl = function (URL:string): (string | boolean) {
        if (typeof URL !== "string") return false;
        if (URL.trim()?.replace("://", "")?.split(' ').map(char => char==='/').length >= 4) return false;
    
        
        const url:string = URL.trim().toLowerCase().replace("www.", "");
    
        if (url.startsWith("https://udemy.com/course/")) {
          return url;
        }
    
        return false;
    
      };

      if (!checkCoursedUrl(body?.CourseUrl)) {
        res.status(404).json({ error:"Invalid URL", } as any)
      }



      const result = await fetch(body.CourseUrl as RequestInfo, {
        method: "GET",
        // headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "DNT": "1", "Connection": "close", "Upgrade-Insecure-Requests": "1"}
        headers: {
          "User-Agent": "PostmanRuntime/7.29.0",
          // "Host" : "http://127.0.0.1",
          // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "close"
        }
      });

      const html = await result.text();
      const $ = cheerio.load(html);
      // del// console.log(html);


      const name:string = $(".clp-lead__title--small").text();
      const description:string = $(".clp-lead__headline").text();
      const rating:string = $(".star-rating--rating-number--2o8YM").text();
      const students:string = $(".enrollment").text() ? $(".enrollment").text().split(' ').at(0).trim().replace(/ /, '') : "none";
      // const features:string = $(".sidebar-container--content--gsvyJ").text();
      const imgUrl:string = ($(".intro-asset--img-aspect--1UbeZ").html() + "").split('srcset')[0].replace('<img src="', '').replace(/"/g, '').trim();

      // const $imgHtml$ = cheerio.load(imgUrlHtml);

      // for (let prop in Object.values($(".star-rating--rating-number--2o8YM"))) features.push(String(prop))

      //////


      const isRatingOk:boolean = +rating > 3.5;
      const isStudentsAmountOk:boolean = (+(students.replace(/,/g, ''))) >= 1000 || students.length > 3;

      let giftServicePrice:string = "6.99";
      let accountServicePrice:string = "5.99";

      // del// console.log(students, isStudentsAmountOk)
      if (!isStudentsAmountOk) accountServicePrice = "Not avilable!";



      res.status(200).json({
        name,
        description,
        rating,
        students,
        // features,
        imgUrl,
        giftServicePrice,
        accountServicePrice,
      });

      
    } catch (err) {
      // del// console.log(err)
      res.status(500).json({
        error: err,
      } as Data)
    }

  }


}