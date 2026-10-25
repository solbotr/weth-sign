const fs=require("fs");
const h=fs.readFileSync("index.html","utf8");
const src=h.slice(h.indexOf("<script>")+8, h.lastIndexOf("</script>"));
const els={};
const mk=id=>els[id]||(els[id]={id,textContent:"",innerHTML:"",className:"",value:"",hidden:false,disabled:false,focus(){},select(){}});
global.document={getElementById:mk,execCommand:()=>true};
global.navigator={clipboard:{writeText:async()=>{}}};
global.alert=()=>{};
const OWNER="0x42607b2e4fde22e83822d4a86ddac58d847dc289";
global.window={ethereum:{on(){},request:async({method,params})=>{
  if(method==="eth_requestAccounts")return[OWNER];
  if(method==="wallet_switchEthereumChain")return null;
  if(method==="eth_call")throw new Error("eth_call not supported by this wallet");
  if(method==="eth_signTypedData_v4")return "0x"+"11".repeat(32)+"22".repeat(32)+"1b";
  throw new Error(method);
}}};
new Function(src)();
(async()=>{
  await new Promise(r=>setTimeout(r,20));
  els.connect.onclick();
  await new Promise(r=>setTimeout(r,4000));
  console.log("msg:", mk("msg").textContent);
  console.log("sign enabled (http fallback):", !els.sign.disabled);
})();

