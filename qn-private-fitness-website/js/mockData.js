/**
 * QN Private Fitness - Mock Data
 * All website content is stored here and rendered by app.js
 */

const siteData = {
  brandName: "QN Private Fitness",
  slogan: "PHÒNG TẬP CHẤT — GIÁ SIÊU NGẤT",
  tagline: "Tập luyện cùng huấn luyện viên chuyên nghiệp",
  description: "Trải nghiệm đẳng cấp tập luyện cá nhân hóa, nơi mỗi buổi tập là một hành trình biến đổi thực sự.",

  contact: {
    address: [
      "Cơ sở 1: 154 Triệu Nữ Vương, Hải Châu, Đà Nẵng",
      "Cơ sở 2: 78 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng"
    ],
    phone: "033 598 3908",
    email: "info@qnprivatefitness.vn",
    facebook: "https://facebook.com/qnprivatefitness",
    instagram: "https://instagram.com/qnprivatefitness",
    zalo: "0335983908",
    hours: "05:30 – 22:00 (Thứ 2 – Chủ Nhật)"
  },

  nav: [
    { label: "Trang chủ", href: "#hero" },
    { label: "Về chúng tôi", href: "#about" },
    { label: "Dịch vụ", href: "#services" },
    { label: "HLV", href: "#trainers" },
    { label: "Kết quả", href: "#transformations" },
    { label: "Cơ sở", href: "#facility" },
    { label: "Liên hệ", href: "#contact" }
  ],

  statistics: [
    { value: 500, suffix: "+", label: "Học viên đã đào tạo", icon: "fas fa-users" },
    { value: 5, suffix: "+", label: "Năm kinh nghiệm", icon: "fas fa-trophy" },
    { value: 98, suffix: "%", label: "Khách hàng hài lòng", icon: "fas fa-star" },
    { value: 3000, suffix: "+", label: "Buổi coaching", icon: "fas fa-dumbbell" }
  ],

  about: {
    title: "VỀ CHÚNG TÔI",
    subtitle: "Không gian tập luyện riêng tư — đẳng cấp quốc tế",
    mission: "Sứ mệnh của chúng tôi là tạo ra môi trường tập luyện riêng tư, chuyên nghiệp và hiệu quả nhất, nơi mỗi học viên đều được đồng hành cùng huấn luyện viên cá nhân để đạt mục tiêu nhanh nhất.",
    vision: "Trở thành trung tâm fitness cá nhân hóa hàng đầu tại Đà Nẵng, nơi kết hợp khoa học thể thao hiện đại với trải nghiệm cao cấp.",
    values: [
      { icon: "fas fa-medal", title: "Chuyên Nghiệp", desc: "Đội ngũ HLV được đào tạo bài bản, có chứng chỉ quốc tế" },
      { icon: "fas fa-user-shield", title: "Riêng Tư", desc: "Không gian tập luyện độc lập, không bị phân tâm" },
      { icon: "fas fa-chart-line", title: "Hiệu Quả", desc: "Chương trình cá nhân hóa 100% theo thể trạng và mục tiêu" },
      { icon: "fas fa-heart", title: "Tận Tâm", desc: "Đồng hành 24/7, theo dõi tiến độ liên tục" }
    ]
  },

  services: [
    {
      id: 1,
      image: "assets/images/trainer-training.jpg",
      title: "Personal Training",
      subtitle: "1-1 Private Session",
      description: "Chương trình tập luyện cá nhân 1-1 với huấn luyện viên riêng, được thiết kế hoàn toàn theo thể trạng và mục tiêu của bạn.",
      benefits: [
        "Đánh giá thể lực & lập kế hoạch cá nhân",
        "HLV cạnh bên suốt toàn bộ buổi tập",
        "Điều chỉnh kỹ thuật theo thời gian thực",
        "Theo dõi tiến độ hàng tuần"
      ],
      badge: "PHỔ BIẾN NHẤT",
      accent: "#c9a84c"
    },
    {
      id: 2,
      image: "assets/images/facility-gym-1.jpg",
      title: "Weight Loss Program",
      subtitle: "Giảm mỡ hiệu quả",
      description: "Chương trình giảm cân khoa học kết hợp cardio, strength training và tư vấn dinh dưỡng toàn diện.",
      benefits: [
        "Tư vấn dinh dưỡng cá nhân",
        "Kết hợp cardio & strength training",
        "Đo % mỡ cơ thể định kỳ",
        "Hỗ trợ tâm lý & động lực"
      ],
      badge: null,
      accent: "#2ecc71"
    },
    {
      id: 3,
      image: "assets/images/facility-gym-2.jpg",
      title: "Muscle Building",
      subtitle: "Tăng cơ & định hình",
      description: "Chương trình tăng cơ chuyên sâu với phương pháp tập luyện progressive overload kết hợp bổ sung dinh dưỡng tối ưu.",
      benefits: [
        "Lập kế hoạch progressive overload",
        "Hướng dẫn supplement phù hợp",
        "Tập trung nhóm cơ theo kế hoạch",
        "Kiểm tra body composition định kỳ"
      ],
      badge: null,
      accent: "#e74c3c"
    },
    {
      id: 4,
      image: "assets/images/trainer-main.jpg",
      title: "Online Coaching",
      subtitle: "Tập mọi lúc mọi nơi",
      description: "Chương trình coaching online linh hoạt, phù hợp với những ai bận rộn nhưng vẫn muốn có lịch tập chuyên nghiệp.",
      benefits: [
        "Video call tư vấn hàng tuần",
        "Lịch tập & dinh dưỡng online",
        "Hỗ trợ qua Zalo/Messenger 24/7",
        "Check-in tiến độ định kỳ"
      ],
      badge: "MỚI",
      accent: "#9b59b6"
    }
  ],

  trainers: [
    {
      id: 1,
      image: "assets/images/trainer-main.jpg",
      name: "Trainer Nguyễn Quốc",
      role: "Head Coach & Founder",
      specialty: "Strength & Conditioning",
      experience: "5+ năm kinh nghiệm",
      certifications: ["ACE Personal Trainer", "NSCA-CPT", "Nutrition Specialist"],
      bio: "Founder của QN Private Fitness với hơn 5 năm kinh nghiệm huấn luyện cá nhân. Chuyên gia về strength training và body transformation.",
      social: { instagram: "#", facebook: "#" }
    },
    {
      id: 2,
      image: "assets/images/trainer-training.jpg",
      name: "Coach Minh Nhân",
      role: "Senior Fitness Coach",
      specialty: "Weight Loss & Cardio",
      experience: "3+ năm kinh nghiệm",
      certifications: ["ACSM Certified", "Zumba Instructor", "Boxing Trainer"],
      bio: "Chuyên gia giảm cân và cardio fitness với phương pháp khoa học, giúp hơn 200 học viên đạt mục tiêu cơ thể lý tưởng.",
      social: { instagram: "#", facebook: "#" }
    }
  ],

  transformations: [
    {
      id: 1,
      name: "Anh Tuấn",
      duration: "3 tháng",
      before: { weight: "85kg", fat: "28%" },
      after: { weight: "72kg", fat: "14%" },
      image: "assets/images/trainer-training.jpg",
      quote: "Chưa bao giờ tôi nghĩ mình có thể thay đổi đến như vậy. QN đã giúp tôi tìm lại chính mình!",
      rating: 5
    },
    {
      id: 2,
      name: "Chị Lan",
      duration: "4 tháng",
      before: { weight: "72kg", fat: "32%" },
      after: { weight: "58kg", fat: "18%" },
      image: "assets/images/trainer-main.jpg",
      quote: "Sau sinh con, tôi tưởng mãi không lấy lại vóc dáng. Nhờ QN, tôi tự tin hoàn toàn!",
      rating: 5
    },
    {
      id: 3,
      name: "Anh Hùng",
      duration: "6 tháng",
      before: { weight: "68kg", fat: "20%" },
      after: { weight: "80kg", fat: "10%" },
      image: "assets/images/facility-gym-1.jpg",
      quote: "Mục tiêu tăng 12kg cơ trong 6 tháng tưởng không thể. Với QN, mọi thứ đều có thể!",
      rating: 5
    }
  ],

  facility: [
    { image: "assets/images/facility-gym-1.jpg", title: "Khu vực cardio", desc: "Máy chạy bộ, đạp xe cao cấp" },
    { image: "assets/images/facility-gym-2.jpg", title: "Khu vực tạ", desc: "Thiết bị tạ tự do đầy đủ" },
    { image: "assets/images/trainer-training.jpg", title: "Private training room", desc: "Phòng tập riêng tư 1-1" },
    { image: "assets/images/trainer-main.jpg", title: "Khu vực tư vấn", desc: "Không gian tư vấn chuyên nghiệp" }
  ],

  testimonials: [
    {
      id: 1,
      name: "Nguyễn Văn Thành",
      role: "Kế toán viên",
      avatar: "assets/images/trainer-main.jpg",
      rating: 5,
      text: "QN Private Fitness thực sự là nơi tôi tìm được. Huấn luyện viên rất tận tâm, luôn điều chỉnh bài tập phù hợp với khả năng của tôi. Sau 3 tháng, tôi giảm được 10kg và cảm thấy tràn đầy năng lượng!",
      result: "Giảm 10kg trong 3 tháng"
    },
    {
      id: 2,
      name: "Trần Thị Mai",
      role: "Giáo viên",
      avatar: "assets/images/trainer-training.jpg",
      rating: 5,
      text: "Điều tôi thích nhất là không gian riêng tư và sự chuyên nghiệp của HLV. Không bao giờ cảm thấy bị phán xét, luôn được hỗ trợ tích cực. Đây là đầu tư tốt nhất cho sức khỏe của tôi.",
      result: "Tăng cơ, giảm mỡ rõ rệt"
    },
    {
      id: 3,
      name: "Lê Minh Đức",
      role: "Doanh nhân",
      avatar: "assets/images/facility-gym-1.jpg",
      rating: 5,
      text: "Lịch tập linh hoạt, phù hợp với người bận rộn như tôi. HLV theo dõi sát sao từng buổi tập, kết quả thấy rõ sau 6 tuần đầu tiên. Tôi sẽ tập ở đây lâu dài.",
      result: "Cải thiện thể lực toàn diện"
    },
    {
      id: 4,
      name: "Phạm Thị Hoa",
      role: "Bác sĩ",
      avatar: "assets/images/trainer-main.jpg",
      rating: 5,
      text: "Là bác sĩ, tôi hiểu tầm quan trọng của tập luyện khoa học. QN Private Fitness đáp ứng được tiêu chuẩn về an toàn và hiệu quả. Chương trình được xây dựng bài bản, không chỉ tập mà còn học được kiến thức.",
      result: "Phục hồi chức năng & tăng sức bền"
    }
  ],

  process: [
    {
      step: "01",
      icon: "fas fa-clipboard-list",
      title: "Đăng Ký",
      desc: "Liên hệ để đặt lịch tư vấn miễn phí. Chúng tôi sẽ giúp bạn tìm hiểu chương trình phù hợp nhất."
    },
    {
      step: "02",
      icon: "fas fa-heartbeat",
      title: "Đánh Giá Thể Trạng",
      desc: "HLV sẽ kiểm tra thể lực, đo thành phần cơ thể và hiểu rõ mục tiêu, sức khỏe hiện tại của bạn."
    },
    {
      step: "03",
      icon: "fas fa-brain",
      title: "Lập Kế Hoạch",
      desc: "Xây dựng chương trình tập luyện và dinh dưỡng 100% cá nhân hóa dựa trên kết quả đánh giá."
    },
    {
      step: "04",
      icon: "fas fa-chart-line",
      title: "Đồng Hành & Theo Dõi",
      desc: "HLV đồng hành mỗi buổi tập, theo dõi tiến độ và điều chỉnh kế hoạch liên tục để tối ưu kết quả."
    }
  ],

  faq: [
    {
      question: "Tôi có cần kinh nghiệm tập gym trước không?",
      answer: "Không cần. Chúng tôi nhận học viên ở mọi trình độ, từ người mới bắt đầu hoàn toàn đến vận động viên chuyên nghiệp. HLV sẽ thiết kế chương trình phù hợp với xuất phát điểm của bạn."
    },
    {
      question: "Một buổi tập kéo dài bao lâu?",
      answer: "Mỗi buổi tập thường kéo dài 60-90 phút, bao gồm khởi động, phần tập chính và giãn cơ. Tùy theo mục tiêu và thể trạng, HLV có thể điều chỉnh thời gian phù hợp."
    },
    {
      question: "Tôi nên tập mấy buổi mỗi tuần?",
      answer: "Thông thường chúng tôi khuyến nghị 3-5 buổi/tuần tùy mục tiêu và thể trạng. Với người mới, 3 buổi/tuần là lý tưởng để cơ thể có thời gian phục hồi và thích nghi."
    },
    {
      question: "Chi phí tập luyện như thế nào?",
      answer: "Chi phí được tính theo gói buổi tập, từ gói 10 đến 50 buổi. Liên hệ trực tiếp để được tư vấn gói phù hợp nhất với mục tiêu và ngân sách của bạn. Chúng tôi cũng có buổi tập thử miễn phí."
    },
    {
      question: "Có hỗ trợ tư vấn dinh dưỡng không?",
      answer: "Có. Tất cả chương trình của chúng tôi đều đi kèm tư vấn dinh dưỡng cơ bản. Với gói nâng cao, bạn sẽ nhận được kế hoạch dinh dưỡng chi tiết và được theo dõi hàng tuần."
    },
    {
      question: "Tôi có thể hủy hoặc dời lịch tập không?",
      answer: "Được. Bạn có thể hủy hoặc dời lịch tập trước ít nhất 4 tiếng mà không bị tính phí. Chúng tôi hiểu rằng cuộc sống bận rộn, nên linh hoạt lịch tập là ưu tiên của chúng tôi."
    }
  ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteData;
}
