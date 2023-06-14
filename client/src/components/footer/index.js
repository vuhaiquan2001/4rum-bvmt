import React from "react";

function Footer() {
  return (
    <div className="flex bg-[var(--primary-bg-color)] justify-center w-full h-max  px-[16px] mt-[40px] border-t-[2px] border-white">
      <div className="flex flex-col justify-center max-w-[1140px] mx-auto">
        <div className="text-xs text-[var(--primary-text-color)] py-1 text-center">
         Đây là sản phẩm RESTful API đầu tiên của tác giả, vì thế còn rất nhiều sai sót. Mong mọi người góp ý để giúp mình cải thiện.
          <div className="text-[var(--sub-text-color)]">Tác giả: Vũ Hải Quân</div>
          <div className="text-[var(--sub-text-color)]">Email: Vuhaiquan2k1@gmail.com</div>
          <a href="https://github.com/vuhaiquan2001"  className="text-[var(--sub-text-color)] hover:underline">GitHub: https://github.com/vuhaiquan2001</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
