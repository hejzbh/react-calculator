export const  formatNumber= (num) => {
    if(!num) return '';
      return Intl.NumberFormat(navigator.language).format(num);
  }