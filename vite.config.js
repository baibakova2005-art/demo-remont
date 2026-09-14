import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Настоящие хостинги (Vercel, GitHub Pages, nginx) на адрес «/privacy/» сами отдают
// файл «/privacy/index.html». Дев-сервер Vite так не умеет: он вернёт 404.
// Эти несколько строк дописывают index.html к адресам-папкам, чтобы в разработке
// было ровно то же поведение, что на хостинге, и расхождение не всплыло после выкладки.
function papkiKakNaHostinge() {
  return {
    name: "papki-kak-na-hostinge",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.endsWith("/") && req.url !== "/") {
          req.url += "index.html";
        }
        next();
      });
    },
  };
}

// Две настройки ниже — не украшение. Без них сайт не откроется на этой машине.
const PORT = 5190;

export default defineConfig({
  base: "/demo-remont/",
  plugins: [react(), tailwindcss(), papkiKakNaHostinge()],

  // Страницы документов лежат в public/privacy|consent|terms/index.html.
  // Без "mpa" дев-сервер молча подменяет их главной страницей (своя SPA-заглушка),
  // и в разработке видно не то, что окажется на хостинге. Проверено 12.09.2026.
  // Если появится react-router с клиентскими маршрутами — вернуть "spa".
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        uslugi: "uslugi/index.html",
        raboty: "raboty/index.html",
        kontakty: "kontakty/index.html",
      },
    },
  },
  server: {
    // ОБЯЗАТЕЛЬНО. Без этой строки Vite садится только на IPv6-петлю [::1],
    // а она заблокирована VPN — браузер молча не достучится до сервера.
    // Симптом: netstat показывает «[::1]:PORT LISTENING» и «127.0.0.1 SYN_SENT».
    host: "127.0.0.1",

    // Порт 5173 (по умолчанию у Vite) на этой машине зарезервирован Windows.
    // Если запускаешь два проекта разом — поменяй число выше на соседнее.
    port: PORT,

    // Падать, а не молча уезжать на другой порт: иначе launch.json промахнётся.
    strictPort: true,
  },
});
