# Kendo Crypto Tracker

A modern cryptocurrency tracking application built with React, TypeScript, and KendoReact. Track your favorite cryptocurrencies, manage your portfolio, and stay updated with the latest market trends.

![Kendo Crypto Tracker Screenshot](./public/screenshot.png)

## ✨ Features

- 📊 Real-time cryptocurrency price tracking
- 💼 Portfolio management
- 📈 Interactive charts and market data
- 🔍 Search and filter cryptocurrencies
- 📱 Responsive design for all devices
- 🎨 Modern UI with KendoReact components
- 🔒 Secure and fast with TypeScript

## 🚀 Technologies

- **Frontend**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: KendoReact
- **Styling**: Styled Components
- **Routing**: React Router v7
- **Icons**: Font Awesome, React Icons, LedgerHQ Crypto Icons

## 📦 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kendo-crypto-tracker.git
   cd kendo-crypto-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Data files and mock data
├── models/        # TypeScript type definitions
├── pages/         # Page components
│   ├── HomePage.tsx
│   ├── PortfolioPage.tsx
│   ├── CoinListPage.tsx
│   ├── SettingsPage.tsx
│   ├── EducationPage.tsx
│   └── NotFoundPage.tsx
├── services/      # API and service layer
├── styles/        # Global styles and themes
└── utils/         # Utility functions
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.coingecko.com/api/v3
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [KendoReact](https://www.telerik.com/kendo-react-ui/) for the amazing UI components
- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Vite](https://vitejs.dev/) for the excellent development experience
