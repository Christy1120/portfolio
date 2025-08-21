import React from "react";

export default function EnhancedContentSections() {
  return (
    <div className="space-y-20">
      {/* Section 1 - 設計理念 */}
      <section className="pd-fade-in-delay">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">設計理念</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                在這個專案中，我們秉持著「以用戶為中心」的設計哲學，深入研究目標用戶的需求和行為模式，
                確保每一個設計決策都能為用戶帶來價值。
              </p>
              <p className="mb-4">
                通過現代化的視覺語言和直觀的交互設計，我們創造了一個既美觀又實用的產品體驗。
                色彩搭配、字體選擇、佈局安排都經過精心考慮，力求達到視覺與功能的完美平衡。
              </p>
              <p>同時，我們也注重產品的可訪問性和包容性設計，確保不同背景和能力的用戶都能順暢地使用我們的產品。</p>
            </div>
          </div>

          <div className="relative group">
            {/* 霧化光暈：品牌漸層 token（粉→橙黃） */}
            <div className="absolute -inset-2 pd-section-glow-a rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative pd-glass-card rounded-xl overflow-hidden pd-lift-hover">
              <img
                src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop"
                alt="Design process"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - 技術實現 */}
      <section className="pd-fade-in-delay">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1 relative group">
            {/* 霧化光暈：品牌漸層 token（橙黃→粉） */}
            <div className="absolute -inset-2 pd-section-glow-b rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative pd-glass-card rounded-xl overflow-hidden pd-lift-hover">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
                alt="Technical implementation"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">技術實現</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                技術架構的選擇直接影響到產品的性能和可維護性。我們採用了現代化的技術棧，
                包括 React 進行前端開發，Node.js 構建後端服務，確保了良好的開發體驗和運行性能。
              </p>
              <p className="mb-4">
                在開發過程中，我們遵循最佳實踐，採用組件化的開發模式，提高代碼的複用性和可維護性。
                同時，我們也注重代碼質量，通過 ESLint、Prettier 等工具確保代碼風格的一致性。
              </p>
              <p>為了保證產品的穩定性和可靠性，我們建立了完整的測試體系，包括單元測試、集成測試和端到端測試。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - 成果展示 */}
      <section className="pd-fade-in-delay">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">成果展示</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            通過精心的設計和開發，我們成功打造了一個既美觀又實用的產品
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "用戶體驗提升",
              description: "通過優化界面設計和交互流程，用戶滿意度提升了 85%",
              metric: "85%",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
            },
            {
              title: "性能優化",
              description: "通過技術優化，頁面載入速度提升了 3 倍",
              metric: "3x",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
            },
            {
              title: "移動端適配",
              description: "完美適配各種設備尺寸，移動端用戶占比達到 60%",
              metric: "60%",
              image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
            }
          ].map((item, index) => (
            <div key={index} className="pd-glass-card rounded-xl overflow-hidden pd-lift-hover group">
              <div className="pd-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-[#f7797d] mb-2">{item.metric}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 - 反思 */}
      <section className="pd-fade-in-delay">
        <div className="pd-glass-card rounded-2xl p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">專案反思與學習</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              每個專案都是一次學習和成長的機會。通過這個專案，我不僅提升了技術能力，
              更重要的是深化了對用戶體驗設計的理解，以及如何在技術實現與設計美感之間找到最佳平衡點。
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { title: "用戶研究", desc: "深入了解用戶需求，通過訪談和測試不斷優化產品體驗" },
                { title: "技術創新", desc: "探索新技術的可能性，在保證穩定性的前提下嘗試創新方案" },
                { title: "持續改進", desc: "建立反饋機制，根據用戶反饋持續優化和改進產品功能" },
              ].map((b, i) => (
                <div className="space-y-3" key={i}>
                  <div className="w-12 h-12 rounded-xl mx-auto md:mx-0" style={{
                    background: "linear-gradient(135deg, #fbd786 0%, #f7797d 100%)"
                  }} />
                  <h3 className="font-semibold text-gray-900 text-center md:text-left">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
