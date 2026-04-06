import React from 'react';

export default function AmbientBackground() {
  return (
    <div
      // 設定為 absolute 鋪滿全螢幕，並且 pointer-events-none 確保不會擋到使用者的點擊操作
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        backgroundColor: 'hsla(146, 0%, 0%, 1)', // 純黑底色
        backgroundImage: `
          radial-gradient(at 87% 25%, hsla(240, 3%, 8%, 1.00) 0px, transparent 50%),
          radial-gradient(at 79% 70%, hsla(240, 0%, 0%, 1) 0px, transparent 50%),
          radial-gradient(at 84% 87%, hsla(138, 0%, 0%, 1) 0px, transparent 50%),
          radial-gradient(at 24% 60%, hsla(330, 100%, 72%, 0.50) 0px, transparent 50%),
          radial-gradient(at 37% 76%, hsla(326, 98%, 64%, 0.47) 0px, transparent 50%),
          radial-gradient(at 20% 69%, hsla(319, 98%, 76%, 0.29) 0px, transparent 50%)
        `,
        // 加上一點模糊濾鏡可以讓漸層融合得更自然 (可選)
        filter: 'blur(40px)',
        // 放大一點點，避免邊緣出現生硬的裁切
        transform: 'scale(1.1)', 
      }}
    />
  );
}