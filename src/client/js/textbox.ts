import App from "./app";

type Actions = 'delete'|'rename'|'read';
interface IContentTask {
  _id: string;
  title: string;
  priority: string;
  description: string;
  _id_notebook: string;
}

class TextBox{
    private static container:HTMLDivElement = document.querySelector('#cont-text-box');
    private static contImg:HTMLDivElement = TextBox.container.querySelector('div > #cont-img');
    private static contTitle:HTMLDivElement = TextBox.container.querySelector('div > #cont-title > h1');
    private static contMsg:HTMLParagraphElement = TextBox.container.querySelector('div > #cont-msg');
    private static contText:HTMLDivElement = TextBox.container.querySelector('div > #cont-read-text');
    private static input:HTMLInputElement = TextBox.container.querySelector('div > input');
    private static aceptBtn:HTMLButtonElement = TextBox.container.querySelector('div > #btn-acept');
    private static closeBtn:HTMLButtonElement = TextBox.container.querySelector('div > #btn-close');
    static async showMsg(action:Actions, json?:string | IContentTask):Promise<string | undefined>{
        App.closeEverything();
        TextBox.Responsive('visible');
        TextBox.cleanBox(action);
        TextBox.runAction(action, json);
        return new Promise((resolve, reject)=>{
          TextBox.aceptBtn.onclick = ()=>{
            if(action !== 'read'){
              let text = TextBox.input.value;
              if(text){
                TextBox.Responsive('hidden');
                resolve(text);
              }
            }else{
              TextBox.Responsive('hidden');
            }
          };
          TextBox.closeBtn.onclick = ()=>{
            TextBox.Responsive('hidden');
            resolve(undefined);
          }
        })
    }
    public static Responsive(display:'hidden' | 'visible'){
      if(display === 'visible'){
        App.isMatches(()=>{
          TextBox.container.style.display = 'flex';
        }, ()=>{
          TextBox.container.style.display = 'flex';
        })
      }else if(display === 'hidden'){
        App.isMatches(()=>{
          TextBox.container.style.display = 'none';
        }, ()=>{
          TextBox.container.style.display = 'none';
        })
      }
    }
    public static cleanBox(action:Actions){
      if(action !== 'read'){
        TextBox.contText.innerHTML = '';
        TextBox.contImg.style.display = 'block';
        TextBox.input.style.display = 'block';
      }else{
        TextBox.contImg.style.display = 'none';
        TextBox.contImg.style.height = '0px';
        TextBox.input.style.display = 'none';
        TextBox.contMsg.innerHTML = '';
      }
    }
    private static runAction(action:Actions, json?:string | IContentTask){
      switch(action){
        case 'delete':
            TextBox.deleteMsg(json as string);
        break;
        case 'rename':
            TextBox.renameMsg(json as string);
        break;
        case 'read':
          TextBox.readTaskMsg(json as IContentTask);
        break;
      }
    }
    private static readTaskMsg(json:IContentTask){
      let title = 'Read Notebook';

      TextBox.contTitle.innerHTML = title;
      TextBox.contText.innerHTML = TextBox.readHTML(json);
    }
    private static deleteMsg(name:string){
        let title = 'Delete Notebook';
        let img = TextBox.deleteHTML();
        let text = `Are you sure that it wants to delete this notebook?</br>It write "${name}" for confirg`;

        TextBox.contTitle.innerHTML = title;
        TextBox.contImg.innerHTML = img;
        TextBox.contMsg.innerHTML = text;

        TextBox.contImg.style.height = '120px';
    }
    private static renameMsg(name:string){
      let title = 'Rename Notebook';
      let img = TextBox.renameHTML();
      let text = 'Change the name notebook';

      TextBox.contTitle.innerHTML = title;
      TextBox.contImg.innerHTML = img;
      TextBox.contMsg.innerHTML = text;

      TextBox.contImg.style.height = '150px';
    }
    private static readHTML(json){
      return `
        <header><h1>${json.name}</h1></header>
        <span id="title">${json.title}</span>
        <span id="priority">${json.priority}</span>
        <span id="description">${(json.description)?json.description:'<b>undefined</b>'}</span>
      `
    }
    private static deleteHTML(){
        return `
        <svg width="524" height="455" viewBox="0 0 524 455" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path opacity="0.24" d="M249.27 2.33C219.58 0.0399964 189.34 -2.22 160.27 4.22C131.2 10.66 102.98 27.22 90.13 53.56C73.47 87.69 85.79 129.17 74.13 165.23C67.72 185.05 54.5 201.92 42.66 219.23C23.65 246.97 7.37999 277.47 1.86999 310.47C-3.64001 343.47 2.70999 379.59 24.65 405.3C59.76 446.57 121.87 450.61 176.73 451.47L370.93 454.39C396.08 454.77 422.26 454.94 445 444.39C481.26 427.47 499.83 387.93 511.86 350.47C523.13 315.38 530.94 275.97 514.61 242.84C505.42 224.2 489.21 209.1 482.61 189.42C474.17 164.01 483.43 136.47 482.61 109.76C479.03 -11.35 331.71 8.68 249.27 2.33Z" fill="#7B68EE"/>
        <path d="M329.75 133.7C329.801 132.774 329.59 131.852 329.14 131.04C328.713 130.506 328.173 130.073 327.56 129.77C319.563 125.101 310.687 122.136 301.49 121.06C299.993 120.774 298.447 120.892 297.01 121.4C295.01 122.27 294.01 124.35 293.06 126.28L275.36 163.28C274.89 164.28 274.42 165.4 274.89 166.37C275.177 166.867 275.578 167.289 276.06 167.6C290.595 178.354 308.751 183.018 326.67 180.6C329.183 180.405 331.61 179.598 333.74 178.25C341.74 172.41 335.36 164.93 331.53 159.47C327.1 153.16 330.02 141.3 329.75 133.7Z" fill="#7B68EE"/>
        <path d="M329.75 133.7C329.801 132.774 329.59 131.852 329.14 131.04C328.713 130.506 328.173 130.073 327.56 129.77C319.563 125.101 310.687 122.136 301.49 121.06C299.993 120.774 298.447 120.892 297.01 121.4C295.01 122.27 294.01 124.35 293.06 126.28L275.36 163.28C274.89 164.28 274.42 165.4 274.89 166.37C275.177 166.867 275.578 167.289 276.06 167.6C290.595 178.354 308.751 183.018 326.67 180.6C329.183 180.405 331.61 179.598 333.74 178.25C341.74 172.41 335.36 164.93 331.53 159.47C327.1 153.16 330.02 141.3 329.75 133.7Z" fill="url(#1606791322126.126_paint0_linear)"/>
        <path d="M241.05 139.72C241.446 138.833 242.045 138.052 242.8 137.44C243.775 136.881 244.887 136.604 246.01 136.64C251.599 136.473 257.194 136.657 262.76 137.19C266.39 137.337 269.998 137.84 273.53 138.69C276.096 139.392 278.548 140.46 280.81 141.86C281.888 142.416 282.781 143.275 283.38 144.33C283.786 145.393 283.931 146.539 283.8 147.67C283.63 151.91 283.41 156.15 283.17 160.38C282.69 168.89 282.09 177.6 278.63 185.38C278.26 186.357 277.675 187.238 276.92 187.96C276.211 188.487 275.401 188.862 274.54 189.06C272.22 189.639 269.841 189.944 267.45 189.97C259.425 190.266 251.394 189.595 243.53 187.97C239.849 187.292 236.266 186.163 232.86 184.61C232.293 184.393 231.805 184.01 231.46 183.51C231.242 183.021 231.156 182.483 231.21 181.95C231.29 175.557 231.563 169.18 232.03 162.82C232.24 160 232.11 156.76 232.96 154.05C233.5 152.32 234.82 150.97 235.74 149.43C237.65 146.27 239.28 142.95 241.05 139.72Z" fill="url(#1606791322126.126_paint1_linear)"/>
        <path d="M337.8 154.94C339.48 154.78 341.29 154.65 342.73 155.53C343.957 156.443 344.881 157.704 345.38 159.15C349.841 169.204 351.876 180.165 351.32 191.15C320.713 194.795 289.902 196.465 259.08 196.15C251.97 196.07 254.08 182.67 257.08 178.59C261.28 173 271.38 170.79 277.52 168.59C296.984 161.606 317.226 157.022 337.8 154.94V154.94Z" fill="url(#1606791322126.126_paint2_linear)"/>
        <path d="M164.37 159.02C164.292 158.549 164.327 158.067 164.473 157.613C164.619 157.159 164.871 156.746 165.208 156.408C165.546 156.071 165.959 155.819 166.413 155.673C166.867 155.527 167.349 155.492 167.82 155.57C193.933 153.523 220.093 152.37 246.3 152.11C247.129 152.029 247.963 152.182 248.71 152.55C249.79 153.22 250.07 154.62 250.27 155.87C251.657 164.99 253.053 174.11 254.46 183.23C254.688 184.081 254.618 184.985 254.26 185.79C253.66 186.79 252.33 187.03 251.17 187.15C228.917 189.528 206.549 190.653 184.17 190.52C177.11 190.47 168.01 192.21 164.48 184.67C161.27 177.78 163.76 166.19 164.37 159.02Z" fill="url(#1606791322126.126_paint3_linear)"/>
        <path d="M185.394 382.668C221.164 384.219 256.955 384.895 292.768 384.695C290.063 388.62 292.417 394.413 296.404 396.973C300.392 399.533 305.367 399.776 310.083 399.898L379.124 401.897C388.604 402.177 398.775 402.262 406.667 396.926C408.29 395.95 409.604 394.523 410.451 392.815C412.74 387.498 407.424 382.182 402.726 378.846L383.342 365.064C374.242 358.608 365.039 352.095 354.729 347.965C340.33 342.219 324.537 341.425 309.068 340.948C273.486 339.901 236.981 338.976 201.51 342.48C190.342 343.462 179.461 346.582 169.444 351.675C163.149 354.842 138.93 361.953 138.062 368.839C136.188 382.593 177.354 382.275 185.394 382.668Z" fill="url(#1606791322126.126_paint4_linear)"/>
        <path d="M297.866 101.349C294.46 96.7382 287.961 95.761 283.349 99.167C278.738 102.573 277.761 109.072 281.167 113.683L347.198 203.082C350.604 207.693 357.103 208.67 361.714 205.264C366.325 201.858 367.302 195.359 363.896 190.748L297.866 101.349Z" fill="url(#1606791322126.126_paint5_linear)"/>
        <path d="M249.982 108.932C253.072 104.104 251.662 97.6842 246.833 94.5945C242.004 91.5047 235.585 92.9145 232.495 97.7434L172.594 191.36C169.505 196.188 170.915 202.608 175.743 205.697C180.572 208.787 186.991 207.377 190.081 202.548L249.982 108.932Z" fill="url(#1606791322126.126_paint6_linear)"/>
        <path d="M368.24 214.48L340.75 366.53H174.68L154.83 214.48H368.24Z" fill="url(#1606791322126.126_paint7_linear)"/>
        <path d="M238.79 266.4V366.53H210.65V266.4C210.748 262.737 212.271 259.257 214.897 256.701C217.522 254.145 221.041 252.715 224.705 252.715C228.369 252.715 231.888 254.145 234.513 256.701C237.139 259.257 238.662 262.737 238.76 266.4H238.79Z" fill="#7B68EE"/>
        <path d="M299.85 266.4V366.53H271.74V266.4C271.838 262.737 273.361 259.257 275.987 256.701C278.612 254.145 282.131 252.715 285.795 252.715C289.459 252.715 292.978 254.145 295.603 256.701C298.229 259.257 299.752 262.737 299.85 266.4Z" fill="#7B68EE"/>
        <path d="M374.02 185.18H149.95C139.992 185.18 131.92 193.252 131.92 203.21V212.95C131.92 222.908 139.992 230.98 149.95 230.98H374.02C383.978 230.98 392.05 222.908 392.05 212.95V203.21C392.05 193.252 383.978 185.18 374.02 185.18Z" fill="#7B68EE"/>
        </g>
        <defs>
        <linearGradient id="1606791322126.126_paint0_linear" x1="299.92" y1="129.83" x2="311.83" y2="203.56" gradientUnits="userSpaceOnUse">
        <stop stop-color="#010101" stop-opacity="0"/>
        <stop offset="0.95" stop-color="#010101"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint1_linear" x1="257.52" y1="136.581" x2="257.52" y2="190.038" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9283EC"/>
        <stop offset="1" stop-color="#1F1941"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint2_linear" x1="303" y1="155" x2="302.849" y2="196.188" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7B68EE"/>
        <stop offset="1" stop-color="#32286D"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint3_linear" x1="208.733" y1="152.089" x2="208.733" y2="190.66" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7B68EE"/>
        <stop offset="1" stop-color="#1A1349"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint4_linear" x1="76340.5" y1="27425.3" x2="77326.1" y2="4083.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#010101" stop-opacity="0"/>
        <stop offset="0.95" stop-color="#010101"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint5_linear" x1="330" y1="126" x2="334" y2="211" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9D8FF6"/>
        <stop offset="1" stop-color="#1F1941"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint6_linear" x1="238.442" y1="147.753" x2="160.483" y2="181.863" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9283EC"/>
        <stop offset="1" stop-color="#1F1941"/>
        </linearGradient>
        <linearGradient id="1606791322126.126_paint7_linear" x1="247.31" y1="387.57" x2="279" y2="135" gradientUnits="userSpaceOnUse">
        <stop stop-color="#7B68EE"/>
        <stop offset="1" stop-color="#010101"/>
        </linearGradient>
        <clipPath id="clip0">
        <rect width="523.95" height="454.47" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        `;
    }
    private static renameHTML(){
        return `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="536.69" height="597.08" viewBox="0 0 536.69 597.08">
        <defs>
          <linearGradient id="1606784307428.428-linear-gradient" x1="-58.3" y1="-230.8" x2="370.35" y2="361.96" gradientTransform="matrix(1, 0, 0, -1, -0.02, 428)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-opacity="0"/>
            <stop offset="0.85" stop-opacity="0.51"/>
            <stop offset="0.99"/>
          </linearGradient>
          <linearGradient id="1606784307428.428-linear-gradient-2" x1="253.4" y1="212.3" x2="252.84" y2="233.89" gradientTransform="translate(0 -168)" xlink:href="#1606784307428.428-linear-gradient"/>
          <linearGradient id="1606784307428.428-linear-gradient-3" x1="310.07" y1="390.38" x2="309.23" y2="571.99" gradientTransform="translate(0 -168)" xlink:href="#1606784307428.428-linear-gradient"/>
          <linearGradient id="1606784307428.428-linear-gradient-4" x1="576.62" y1="30.69" x2="653.8" y2="148.98" gradientTransform="matrix(1, 0, 0, -1, -148.76, 428)" xlink:href="#1606784307428.428-linear-gradient"/>
          <linearGradient id="1606784307428.428-linear-gradient-5" x1="440.65" y1="411.01" x2="445.72" y2="434.48" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#1606784307428.428-linear-gradient"/>
          <linearGradient id="1606784307428.428-linear-gradient-6" x1="436.82" y1="131.71" x2="462.01" y2="132.17" gradientTransform="matrix(1, 0, 0, -1, -0.05, 428.05)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ecc4d7"/>
            <stop offset="0.42" stop-color="#efd4d1"/>
            <stop offset="1" stop-color="#f2eac9"/>
          </linearGradient>
          <linearGradient id="1606784307428.428-linear-gradient-7" x1="587.02" y1="135.78" x2="581.83" y2="133.03" gradientTransform="matrix(1, 0, 0, -1, -148.76, 428)" xlink:href="#1606784307428.428-linear-gradient-6"/>
          <linearGradient id="1606784307428.428-linear-gradient-8" x1="490.36" y1="95.38" x2="518.5" y2="95.38" gradientTransform="matrix(1, 0, 0, -1, -148.76, 428)" xlink:href="#1606784307428.428-linear-gradient-6"/>
        </defs>
        <title>23. Arranging FIles</title>
        <path d="M523.2,569.6c-17.3,2-34.6,3.7-51.9,5.2a7.46,7.46,0,0,0,.7,1.2c1.8,2.7,5.5,3.2,8.6,4.5s5.9,5,3.9,7.6c-1,1.3-2.8,1.7-4.4,1.9l-17.9,3c-21.8,3.6-44.8,7.2-65.4-.7-8.5-3.3-9.1-8.2-6.2-12.3-110.7,4.8-221.9,1.1-332.8-2.5-9,0-19.1-2.4-21.5-11.5,57.1-25.7,112.5-25.8,174.4-27.5l217.5-5.8c3.7-.1,7.7-.1,10.9,1.8s5,5.7,7.7,8.5c8,8.3,21.4,6.6,32.9,5.7a126.35,126.35,0,0,1,49.6,6.3c2.2.7,4.6,1.7,5.7,3.7C538,564.3,529.5,568.9,523.2,569.6Z" transform="translate(-0.03 0.05)" fill="#1d2741" opacity="0.18" style="isolation: isolate"/>
        <path d="M232.4,2c-29.2,6.1-54.9,23.5-77.1,43.4s-42,42.5-64.7,61.9c-35.1,30.1-80.1,57.1-89,102.5-7.1,36.4,12.1,72.8,13,109.9C15.1,347.8,5.2,375,3.1,403,1,430.6,7.3,459.8,25.4,480.7c25.8,29.8,70,36.8,109.1,31.2s75.9-21.6,114.4-30.1c46.4-10.2,94.7-9.4,142-4.3,28.9,3.1,59.2,7.6,86.4-2.8,24.2-9.2,43.3-29.8,52.5-54s8.9-51.5,1-76.1c-10.9-34.1-35-62.3-50.4-94.6-13.1-27.5-19.6-57.5-26.8-87.1-4.8-19.6-10.2-39.9-23.5-55.1-15.1-17.5-38-25.6-58.3-36.7C322.7,44.3,296.5-11.4,232.4,2Z" transform="translate(-0.03 0.05)" fill="#7b68ee" opacity="0.18" style="isolation: isolate"/>
        <path d="M119.7,36.5H293.1V571.3H119.7a31.6,31.6,0,0,1-31.6-31.6h0V68.1a31.6,31.6,0,0,1,31.6-31.6Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <path d="M119.7,36.5H293.1V571.3H119.7a31.6,31.6,0,0,1-31.6-31.6h0V68.1a31.6,31.6,0,0,1,31.6-31.6Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient)"/>
        <path d="M138.9,36.5H367.4a37.3,37.3,0,0,1,37.3,37.3V534a37.3,37.3,0,0,1-37.3,37.3H138.9A37.3,37.3,0,0,1,101.6,534V73.8A37.3,37.3,0,0,1,138.9,36.5Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <path d="M391.4,68.6V513.4a19,19,0,0,1-18.9,18.9H133.8A18.86,18.86,0,0,1,115,513.4h0V68.6a18.86,18.86,0,0,1,18.8-18.9H181v5.9a19,19,0,0,0,19,19H305.9a19,19,0,0,0,19-19V49.7h47.6a18.88,18.88,0,0,1,18.9,18.9Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M225.8,51.3h54.7a2.48,2.48,0,0,1,2.5,2.5v.5a2.48,2.48,0,0,1-2.5,2.5H225.8a2.48,2.48,0,0,1-2.5-2.5v-.5A2.54,2.54,0,0,1,225.8,51.3Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient-2)"/>
        <path d="M370.7,49.7V451.8a34.14,34.14,0,0,1-34.1,34.1H115V68.6a18.86,18.86,0,0,1,18.8-18.9H181v5.9a19,19,0,0,0,19,19H305.9a19,19,0,0,0,19-19V49.7Z" transform="translate(-0.03 0.05)" fill="#ebebf0"/>
        <path d="M169.5,227H450.1a18.31,18.31,0,0,1,18.3,18.3v69.1a18.31,18.31,0,0,1-18.3,18.3H169.5a18.31,18.31,0,0,1-18.3-18.3V245.3A18.31,18.31,0,0,1,169.5,227Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <path d="M169.5,227H450.1a18.31,18.31,0,0,1,18.3,18.3v69.1a18.31,18.31,0,0,1-18.3,18.3H169.5a18.31,18.31,0,0,1-18.3-18.3V245.3A18.31,18.31,0,0,1,169.5,227Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient-3)"/>
        <path d="M175,220.4H455.6a18.31,18.31,0,0,1,18.3,18.3v69.1a18.31,18.31,0,0,1-18.3,18.3H175a18.31,18.31,0,0,1-18.3-18.3V238.7A18.31,18.31,0,0,1,175,220.4Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <rect x="143.17" y="102.85" width="47.4" height="47.4" fill="#fff"/>
        <path d="M185.4,239.8h48a9.5,9.5,0,0,1,9.5,9.5v48a9.5,9.5,0,0,1-9.5,9.5h-48a9.5,9.5,0,0,1-9.5-9.5v-48A9.43,9.43,0,0,1,185.4,239.8Z" transform="translate(-0.03 0.05)" fill="#ebebf0"/>
        <rect x="143.17" y="161.65" width="47.4" height="47.4" fill="#fff"/>
        <rect x="143.17" y="348.65" width="47.4" height="47.4" fill="#fff"/>
        <rect x="143.17" y="407.45" width="47.4" height="47.4" fill="#fff"/>
        <path d="M242.8,288.4v8.9a9.5,9.5,0,0,1-9.5,9.5h-48a9.5,9.5,0,0,1-9.5-9.5v-8.9a66.72,66.72,0,0,1,26.5-10.3,14.2,14.2,0,1,1,13.7.1C230.2,280.5,242.8,288.4,242.8,288.4Z" transform="translate(-0.03 0.05)" fill="#fff" opacity="0.38" style="isolation: isolate"/>
        <path d="M450.2,251.5h-181a3,3,0,0,1-3-3h0a3,3,0,0,1,3-3h181a3,3,0,0,1,3,3h0A3,3,0,0,1,450.2,251.5Z" transform="translate(-0.03 0.05)" fill="#ebebf0"/>
        <path d="M208.3,115.2H377.9a2.8,2.8,0,0,1,2.8,2.8h0a2.8,2.8,0,0,1-2.8,2.8H208.3a2.8,2.8,0,0,1-2.8-2.8h0A2.8,2.8,0,0,1,208.3,115.2Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,139.8H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,139.8Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,178H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,178Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,194.1H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,194.1Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,367.1H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,367.1Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,383.2H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,383.2Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,425.9H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,425.9Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M377.9,442H208.3a2.8,2.8,0,0,1-2.8-2.8h0a2.8,2.8,0,0,1,2.8-2.8H377.9a2.8,2.8,0,0,1,2.8,2.8h0A2.86,2.86,0,0,1,377.9,442Z" transform="translate(-0.03 0.05)" fill="#fff"/>
        <path d="M450.2,270.8h-181a3,3,0,0,1-3-3h0a3,3,0,0,1,3-3h181a3,3,0,0,1,3,3h0A3,3,0,0,1,450.2,270.8Z" transform="translate(-0.03 0.05)" fill="#ebebf0"/>
        <path d="M450.2,290.1h-181a3,3,0,0,1-3-3h0a3,3,0,0,1,3-3h181a3,3,0,0,1,3,3h0A3,3,0,0,1,450.2,290.1Z" transform="translate(-0.03 0.05)" fill="#ebebf0"/>
        <path d="M415.8,420.9l-11.4,83a21.75,21.75,0,0,0,1.1,10.4l20.4,60,11.9-3.7-9-59.7a9.26,9.26,0,0,1,.2-3.7l15.5-53.4,6.7,120.4h11l9.5-118.9c3.2-19.8-2.7-34.5-2.7-34.5Z" transform="translate(-0.03 0.05)" fill="#3f3d56"/>
        <path d="M474.2,347.7v57c0,7-1.1,12.6-8.1,12.6H417.3c-7,0-7.2-5.6-7.3-12.6l-.4-38.8s-10.5,18.8-18.9,17-33.3-36.2-33.3-36.2l12.4-10.4,20.9,21s3.4-7.6,8.2-24.7,20.8-17.2,20.8-17.2h42.4C477.4,315.4,474.2,347.7,474.2,347.7Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <path d="M473.9,290.1s15.5,31.8,16.3,42.7-15.8,25.6-15.8,25.6l-12.4-43h11.8V290.1Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <path d="M473.9,290.1s15.5,31.8,16.3,42.7-15.8,25.6-15.8,25.6l-12.4-43h11.8V290.1Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient-4)"/>
        <path d="M474.5,358.4s10.1-27.8,9-34.1-9.6-26.5-9.6-26.5v17.7l-14.9.3Z" transform="translate(-0.03 0.05)" fill="#7b68ee"/>
        <rect x="415.77" y="417.05" width="53.2" height="3.9" fill="#7b68ee"/>
        <rect x="415.77" y="417.05" width="53.2" height="3.9" fill="url(#1606784307428.428-linear-gradient-5)"/>
        <rect x="433.87" y="276.75" width="15.3" height="39" fill="url(#1606784307428.428-linear-gradient-6)"/>
        <path d="M449.2,272.4v43.3h-8.1v-2.6a5.8,5.8,0,0,0-5.8-5.8h-.5a14.53,14.53,0,0,1-14.6-14.5h0V272.5h29Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient-7)"/>
        <path d="M424.1,259.2c3.2-1.8,7.1-2,10.9-2.1l7.9-.2a31.33,31.33,0,0,1,5.3.2,13,13,0,0,1,10.7,15h0a13.82,13.82,0,0,1-.8,2.7,6.64,6.64,0,0,0-.6,2,8.86,8.86,0,0,0,1.1,3.1c1.1,3-.7,6.2-2.7,8.6s-4.4,4.9-4.7,8.1c-.1,1,0,2.2-.7,3a2.56,2.56,0,0,1-3.2.2,7.84,7.84,0,0,1-2.2-2.6c.1,1.5-2,2.3-3.3,1.6a5.17,5.17,0,0,1-2.2-3.7,12.1,12.1,0,0,0-1.3-4.2c-.7-1-1.8-1.7-2.1-2.9-.6-2,1.4-4.2.6-6.2-.6-1.6-2.9-2.1-4.5-1.4a9.83,9.83,0,0,0-3.7,3.6c1.5-2,.3-5.4-1.3-7-2.5-2.7-6.2-.4-8.3-2.3C415.1,270.9,420.6,261.2,424.1,259.2Z" transform="translate(-0.03 0.05)" fill="#3f3d56"/>
        <path d="M445.8,315.6s-6,7.8-14.2,7.8-32.3,23.6-33.9,30.7-7,3.2-7,3.2,3.4-7.6,8.2-24.7,20.8-17.2,20.8-17.2h21.6Z" transform="translate(-0.03 0.05)" fill="#fff" opacity="0.25"/>
        <path d="M437.7,569.6l4.2,10.3-16.9,8L409.3,589s-2.7-10.3,4.6-11.2a24.82,24.82,0,0,0,11.8-4.6Z" transform="translate(-0.03 0.05)" fill="#222a72"/>
        <path d="M451.1,574.2h0a12.83,12.83,0,0,0-7.8,10.5l-.4,4.3h19.2V574.2Z" transform="translate(-0.03 0.05)" fill="#222a72"/>
        <path d="M369.7,336.4l-8.1-10s-2.8-10.7-4.3-4.1c-.9,3.7-3.3,10.4-3.3,10.4H341.6s8.7,9.2,12.4,10.9a20,20,0,0,0,5.3,1.5Z" transform="translate(-0.03 0.05)" fill="url(#1606784307428.428-linear-gradient-8)"/>
      </svg>
        `;
    }
}

export default TextBox;