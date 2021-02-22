export function setCookie(cname, cvalue, extime): void {
   cvalue = encodeURIComponent(cvalue);
   let expires = '';
   if (extime) {
      const d = new Date();
      d.setTime(d.getTime() + extime * 1000);
      expires = `expires=${d.toUTCString()}`;
   }
   if (window.location.href.indexOf('http:') > -1) {
      document.cookie = `${cname}=${cvalue};path=/;${expires}`;
   } else {
      document.cookie = `${cname}=${cvalue};path=/;${expires};secure`;
   }
}

export function getCookie(cname): string {
   const name = `${cname}=`;
   const ca = document.cookie.split(';');
   for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
         return JSON.parse(
            decodeURIComponent(c.substring(name.length, c.length))
         );
      }
   }
   return '';
}

export function deleteCookie(cname): void {
   document.cookie = `${cname}=;path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
