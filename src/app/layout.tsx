import type { Metadata } from "next";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hệ thống X-quang AI | Radiology Workflow & Explainable AI",
    template: "%s | Hệ thống X-quang AI",
  },
  description:
    "Nền tảng quản lý quy trình X-quang ngực, DICOM Viewer, AI hỗ trợ phân tích, Explainable AI (Grad-CAM++) và báo cáo chẩn đoán.",
};

const EXTENSION_CLEANUP_SCRIPT = `(function(){try{function cleanEl(el){if(!el||!el.attributes)return;for(var j=el.attributes.length-1;j>=0;j--){var k=el.attributes[j].name;if(k.indexOf("bis_")===0||k.indexOf("__processed_")===0||k==="fdprocessedid"){el.removeAttribute(k)}}}function cleanTree(root){if(!root)return;cleanEl(root);if(!root.querySelectorAll)return;var a=root.querySelectorAll("*");for(var i=0;i<a.length;i++){cleanEl(a[i])}}cleanTree(document.documentElement);document.addEventListener("DOMContentLoaded",function(){cleanTree(document.documentElement)},{ capture:true });new MutationObserver(function(m){for(var i=0;i<m.length;i++){var x=m[i];if(x.type==="attributes"&&x.attributeName&&(x.attributeName.indexOf("bis_")===0||x.attributeName.indexOf("__processed_")===0||x.attributeName==="fdprocessedid")){x.target.removeAttribute(x.attributeName)}else if(x.type==="childList"){cleanTree(x.target);for(var n=0;n<x.addedNodes.length;n++){cleanTree(x.addedNodes[n])}}}}).observe(document.documentElement,{attributes:true,childList:true,subtree:true});var origErr=console.error;function wrapErr(fn){return function(){for(var i=0;i<arguments.length;i++){var s=arguments[i];if(typeof s==="string"&&(s.indexOf("bis_skin_checked")!==-1||s.indexOf("bis_register")!==-1||s.indexOf("__processed_")!==-1||s.indexOf("hydrated but some attributes of the server rendered HTML")!==-1)){return}}return fn.apply(this,arguments)}}var cur=wrapErr(origErr);Object.defineProperty(console,"error",{configurable:true,enumerable:true,get:function(){return cur},set:function(fn){cur=wrapErr(fn)}})}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${roboto.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: EXTENSION_CLEANUP_SCRIPT }} />
      </head>
      <body suppressHydrationWarning className="min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
