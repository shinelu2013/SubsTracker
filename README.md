# SubsTracker - 訂閱管理與提醒系統

基於 Cloudflare Workers 的輕量級訂閱管理系統，協助您輕鬆追蹤各類訂閱服務的到期時間，並透過 Telegram、微信等發送即時提醒。

![image](https://github.com/user-attachments/assets/22ff1592-7836-4f73-aa13-24e9d43d7064)


## ✨ 特色功能

- 🔔 **自動提醒**: 在訂閱到期前自動發送 Telegram 通知
- 📊 **訂閱管理**: 直覺式 Web 介面管理所有訂閱
- 🔄 **週期計算**: 智慧計算循環訂閱的下一個週期
- 📱 **響應式設計**: 完美適配行動裝置和桌面設備
- ☁️ **無伺服器**: 基於 Cloudflare Workers，無需自建伺服器
- 🔒 **安全可靠**: 資料儲存在 Cloudflare KV 中，安全且高效

## 版本更新
V0: TG 通知 

v1: TG 通知 + NotifyX 通知 

V2: 

✅ 訂閱清單按到期日期升序排序 

✅ 修復了提醒天數邏輯（reminderDays: 0 只在到期日提醒） 

✅ 新增了自動續費切換功能（autoRenew 欄位） 

✅ 增強了測試通知功能（在設定頁面獨立測試按鈕） 

✅ 實現了 Toast 通知系統 

✅ 表單驗證和錯誤處理 

✅ 安全設定（不返回敏感資訊） 

## 🚀 部署指南

### 前提條件

- Cloudflare 帳戶
- Telegram Bot (用於發送通知)
- 可以直接將程式碼丟給 AI，協助查漏補缺

### 部署步驟

1. 登入 Cloudflare，建立 Worker，貼上本專案中的 JS 程式碼，點擊部署

![image](https://github.com/user-attachments/assets/ff4ac794-01e1-4916-b226-1f4f604dcbd3)


2. 建立 KV 鍵值對 **SUBSCRIPTIONS_KV**

![image](https://github.com/user-attachments/assets/c9ebaf3e-6015-4400-bb0a-1a55fd5e14d2)


3. 給 Worker 綁定上鍵值對，以及設定定時執行時間！

![image](https://github.com/user-attachments/assets/25b663b3-8e8e-4386-a499-9b6bf12ead76)


4. 開啟 Worker 提供的網域位址，輸入預設帳號密碼：admin  password (或者 admin admin123)，可以在程式碼中查看預設帳號密碼！

![image](https://github.com/user-attachments/assets/5dac1ce0-43a3-4642-925c-d9cf21076454)


5. 前往系統設定，修改帳號密碼，以及設定 TG 通知的資訊

![image](https://github.com/user-attachments/assets/f6db2089-28a1-439d-9de0-412ee4b2807f)


6. 設定完成可以點擊測試通知，查看是否能夠正常通知，然後就可以正常新增訂閱使用了！

![image](https://github.com/user-attachments/assets/af530379-332c-4482-9e6e-229a9e24775e)


## 贊助
本專案的 CDN 加速和安全防護由騰訊 EdgeOne 贊助。
[Best Asian CDN, Edge, and Secure Solutions - Tencent EdgeOne](https://edgeone.ai/?from=github)
![image](https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png)

## 🤝 貢獻

歡迎貢獻程式碼、回報問題或提出新功能建議！

## 📜 授權條款

MIT License

