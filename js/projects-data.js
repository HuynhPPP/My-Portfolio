const projectsData = [
  // Todo List
  {
    id: "todo-list",
    title: {
      vi: "Todo List",
      en: "Todo List"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: "Một ứng dụng quản lý công việc đơn giản nhưng hiệu quả, giúp bạn theo dõi các nhiệm vụ hàng ngày một cách trực quan.",
      en: "A simple yet effective task management application that helps you track daily tasks visually."
    },
    techs: ["React", "CSS", "LocalStorage"],
    images: ["./assets/project/todo_X_project.png"],
    link: "https://hpcode-todoxapp.onrender.com/",
    type: "personal"
  },

  // Quiz App
  {
    id: "quiz-app",
    title: {
      vi: "Quiz Application",
      en: "Quiz Application"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: "Ứng dụng trắc nghiệm kiến thức với giao diện sinh động, hỗ trợ tính điểm và xem lại kết quả sau khi hoàn thành.",
      en: "Knowledge quiz application with a dynamic interface, supporting scoring and result review."
    },
    techs: ["HTML", "CSS", "JavaScript"],
    images: ["./assets/project/Quiz_App_project.png"],
    link: "https://quiz-app-on6l.onrender.com/",
    type: "personal"
  },

  // An Giang Tourism
  {
    id: "an-giang-tourism",
    title: {
      vi: "An Giang Tourism",
      en: "An Giang Tourism"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: `Website giới thiệu du lịch An Giang với giao diện hiện đại, sử dụng React 19 và Tailwind CSS. Nội dung bao gồm giới thiệu về văn hóa, ẩm thực, danh lam thắng cảnh và các sự kiện đặc trưng của An Giang. Giao diện được thiết kế responsive, tối ưu cho cả mobile và desktop.`,
      en: `An Giang tourism promotion website with a modern interface built with React 19 and Tailwind CSS. Content includes introduction to culture, cuisine, scenic spots, and special events of An Giang. The interface is designed to be responsive, optimized for both mobile and desktop.`
    },
    techs: ["React", "TailwindCSS", "Vite"],
    images: [
      "./assets/project/Angiang_tourism/1.png",
      "./assets/project/Angiang_tourism/2.png",
      "./assets/project/Angiang_tourism/3.png",
      "./assets/project/Angiang_tourism/4.png",
      "./assets/project/Angiang_tourism/5.png",
      "./assets/project/Angiang_tourism/6.png",
      "./assets/project/Angiang_tourism/7.png",
      "./assets/project/Angiang_tourism/8.png",
      "./assets/project/Angiang_tourism/9.png",
    ],
    link: "https://angiangtourism.netlify.app/",
    type: "personal"
  },

  // CMS Ecommerce Website
  {
    id: "ecommerce",
    title: {
      vi: "CMS Ecommerce Website",
      en: "CMS Ecommerce Website"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: `Nền tảng thương mại điện tử full-stack gồm 3 thành phần: Website bán hàng, Trang quản trị (Admin Dashboard) và REST API Backend. Website cho phép người dùng thêm sản phẩm theo danh mục, chọn màu sắc & kích cỡ, quản lý giỏ hàng và đặt hàng COD. Admin Dashboard hỗ trợ quản lý toàn diện sản phẩm, danh mục, đơn hàng và người dùng. Backend được xây dựng với Node.js, Express và Prisma ORM kết nối PostgreSQL, tích hợp Cloudinary để lưu trữ hình ảnh sản phẩm và JWT để xác thực phân quyền.",
      en: "Full-stack e-commerce platform consisting of 3 components: a Storefront, an Admin Dashboard, and a REST API Backend. The storefront allows users to browse products by category, select colors & sizes, manage their shopping cart, and place COD orders. The Admin Dashboard provides full management of products, categories, orders, and users. The backend is built with Node.js, Express, and Prisma ORM connected to PostgreSQL, with Cloudinary integration for product image storage and JWT-based role authentication.`
    },
    techs: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Cloudinary", "JWT"],
    images: [
      "./assets/project/emc_project/emc_project.png",
      "./assets/project/emc_project/emc_project_2.png",
      "./assets/project/emc_project/emc_project_3.png",
      "./assets/project/emc_project/emc_project_4.png",
      "./assets/project/emc_project/emc_project_5.png",
      "./assets/project/emc_project/emc_project_6.png",
      "./assets/project/emc_project/emc_project_7.png",
      "./assets/project/emc_project/emc_project_8.png",
      "./assets/project/emc_project/emc_project_9.png",
      "./assets/project/emc_project/emc_project_10.png",
      "./assets/project/emc_project/emc_project_11.png",
      "./assets/project/emc_project/emc_project_12.png",
      "./assets/project/emc_project/emc_project_13.png",
      "./assets/project/emc_project/emc_project_14.png",
      "./assets/project/emc_project/emc_project_15.png",
      "./assets/project/emc_project/emc_project_16.png",
    ],
    link: "https://cms-ecommerse-wyrm.vercel.app/",
    github: "https://github.com/HuynhPPP/CMS_Ecommerse",
    type: "personal",
    highlights: {
      vi: [
        "3 ứng dụng: Storefront, Admin Dashboard & REST API",
        "Xác thực JWT với phân quyền ADMIN / USER",
        "Quản lý sản phẩm đa màu sắc, kích cỡ & hình ảnh (Cloudinary)",
        "Giỏ hàng, đặt hàng & quản lý địa chỉ giao hàng",
        "Deploy: Backend trên Render, Frontend trên Vercel"
      ],
      en: [
        "3 apps: Storefront, Admin Dashboard & REST API",
        "JWT authentication with ADMIN / USER role-based access",
        "Multi-color, multi-size product management with image uploads (Cloudinary)",
        "Shopping cart, order placement & shipping address management",
        "Deployed: Backend on Render, Frontend on Vercel"
      ]
    }
  },

  // chat-app
  {
    id: "chat-app",
    title: {
      vi: "Chat Web App",
      en: "Chat Web App"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: "Một ứng dụng trò chuyện trực tuyến thời gian thực hiện đại, hỗ trợ nhắn tin cá nhân, nhóm và quản lý bạn bè. Dự án tập trung vào trải nghiệm người dùng mượt mà, tính bảo mật cao với JWT và khả năng mở rộng linh hoạt.",
      en: "A modern real-time online chat application supporting private/group messaging and friend management. Focused on smooth UX, high security with JWT, and flexible scalability."
    },
    techs: ["React 19", "Node.js", "Socket.io", "MongoDB", "Zustand", "Tailwind CSS", "Shadcn UI", "Cloudinary"],
    images: [
      "./assets/project/Chat-App/1.png",
      "./assets/project/Chat-App/2.png",
      "./assets/project/Chat-App/3.png",
      "./assets/project/Chat-App/4.png",
      "./assets/project/Chat-App/5.png",
    ],
    link: "https://chat-web-app-frontend-lyart.vercel.app/",
    type: "personal"
  },

  // Green Landing Page
  {
    id: "landing-page",
    title: {
      vi: "Green Landing Page",
      en: "Green Landing Page"
    },
    category: {
      vi: "Landing Page",
      en: "Landing Page"
    },
    description: {
      vi: "Trang web giới thiệu sản phẩm, với giao diện hiện đại, thân thiện với người dùng.",
      en: "Product landing page with a modern and user-friendly interface."
    },
    techs: ["React", "Vite", "TailwindCSS"],
    images: [
      "./assets/project/Landing_page_green/page1.png",
      "./assets/project/Landing_page_green/page2.png",
      "./assets/project/Landing_page_green/page3.png",
      "./assets/project/Landing_page_green/page4.png",
      "./assets/project/Landing_page_green/page5.png",
      "./assets/project/Landing_page_green/page6.png",
      "./assets/project/Landing_page_green/page7.png",
    ],
    link: "https://landingpagegreen.netlify.app/",
    type: "personal"
  },

  // My-Spotify
  {
    id: "spotify-clone",
    title: {
      vi: "My-Spotify",
      en: "My-Spotify"
    },
    category: {
      vi: "Dự án cá nhân",
      en: "Personal Project"
    },
    description: {
      vi: "Ứng dụng nghe nhạc tương tự Spotify, cho phép người dùng tạo playlist, khám phá các bài hát mới và thưởng thức âm nhạc chất lượng cao.",
      en: "A Spotify-like music application allowing users to create playlists, explore new songs, and enjoy high-quality music."
    },
    techs: ["React", "Firebase", "Spotify API"],
    images: ["./assets/project/project-my-sportify.png"],
    link: "https://my-spotify-rav3.onrender.com/",
    type: "personal"
  }
];
