document.addEventListener("DOMContentLoaded", () => {
    // Helper menggambar kotak sudut melengkung
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
    }

    // Cadangan Otomatis (Fallback) jika internet mati atau foto gagal dimuat
    function generateFallbackArt(food) {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 480;
        const ctx = canvas.getContext("2d");

        const grad = ctx.createLinearGradient(0, 0, 800, 480);
        grad.addColorStop(0, food.colors[0]);
        grad.addColorStop(1, food.colors[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 800, 480);

        ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
        for (let x = 20; x < 800; x += 28) {
            for (let y = 20; y < 480; y += 28) {
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.fillStyle = "rgba(9, 25, 48, 0.55)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1.5;
        drawRoundedRect(ctx, 180, 190, 440, 100, 24);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
        ctx.fillText(food.name, 400, 228);

        ctx.fillStyle = "#9beeff";
        ctx.font = "16px 'Segoe UI', Arial, sans-serif";
        ctx.fillText("Kuliner Khas " + food.origin, 400, 265);

        return canvas.toDataURL("image/png");
    }

    // Data Makanan Nusantara beserta URL Foto Asli & Resep Lengkap
    const foods = [
        {
            name: "Mie Aceh",
            origin: "Aceh (Sabang - Banda Aceh)",
            region: "Sumatera",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
            colors: ["#0f4c81", "#d97706"],
            shortDesc: "Mie kuning tebal dengan irisan daging sapi/seafood dalam kuah kari pedas gurih.",
            fullDesc: "Mie Aceh merupakan kuliner ikonik dari ujung barat Indonesia dengan kuah kari kental kaya rempah.",
            ingredients: [
                "500 gr mie kuning basah tebal",
                "200 gr daging sapi, iris tipis",
                "100 gr udang kupas",
                "1 buah tomat, potong-potong & 100 gr kol iris",
                "Bumbu halus: 6 bawang merah, 4 bawang putih, 5 cabai merah, 3 butir kapulaga, 1/2 sdt jintan, 1 ruas kunyit",
                "2 sdm kecap manis, 1 sdm kecap asin, 500 ml kaldu sapi"
            ],
            steps: [
                "Tumis bumbu halus bersama irisan bawang merah hingga harum matang.",
                "Masukkan daging sapi dan udang, aduk hingga berubah warna.",
                "Tuang air kaldu, kecap manis, kecap asin, garam, dan gula. Masak hingga daging empuk.",
                "Masukkan kol, tomat, tauge, dan mie kuning basah. Aduk rata hingga kuah menyusut dan mengental.",
                "Sajikan hangat dengan emping melinjo, acar bawang merah, dan potongan jeruk nipis."
            ]
        },
        {
            name: "Rendang",
            origin: "Sumatera Barat",
            region: "Sumatera",
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e3a8a", "#991b1b"],
            shortDesc: "Daging sapi yang dimasak perlahan dengan santan dan rempah hingga meresap sempurna.",
            fullDesc: "Rendang adalah masakan daging asli Minangkabau yang dimasak berjam-jam hingga bumbu rempah meresap hitam kecokelatan.",
            ingredients: [
                "1 kg daging sapi (potong kotak ukuran sedang)",
                "1,5 liter santan kental dari 3 butir kelapa tua",
                "2 batang serai (memarkan), 4 lembar daun jeruk, 2 lembar daun kunyit",
                "1 ruas lengkuas (memarkan) & 1 sdm kelapa parut sangrai tumbuk (kerisik)",
                "Bumbu halus: 15 bawang merah, 8 bawang putih, 100 gr cabai merah keriting, 3 cm jahe, 1 sdt ketumbar"
            ],
            steps: [
                "Masak santan bersama bumbu halus, serai, daun kunyit, daun jeruk, dan lengkuas sambil terus diaduk agar santan tidak pecah.",
                "Setelah santan mendidih dan mulai berminyak, masukkan potongan daging sapi.",
                "Kecilkan api, masak perlahan sambil sesekali diaduk hingga santan menyusut.",
                "Masukkan kelapa sangrai tumbuk (kerisik), terus aduk hingga bumbu mengering, berwarna cokelat gelap, dan berminyak.",
                "Angkat dan sajikan bersama nasi hangat."
            ]
        },
        {
            name: "Pempek",
            origin: "Sumatera Selatan (Palembang)",
            region: "Sumatera",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
            colors: ["#0369a1", "#0d9488"],
            shortDesc: "Olahan ikan tenggiri dan sagu yang disajikan dengan kuah cuko asam manis pedas.",
            fullDesc: "Pempek adalah makanan khas Palembang berbahan dasar ikan tenggiri giling dan tepung tapioka dengan kuah cuko hitam.",
            ingredients: [
                "500 gr daging ikan tenggiri giling dingin",
                "350 gr tepung sagu / tapioka",
                "250 ml air es, 1 sdm garam, 1 sdt kaldu jamur",
                "Telur ayam kocok (untuk isian kapal selam)",
                "Bahan Cuko: 250 gr gula batok/aren, 500 ml air, 8 siung bawang putih, 15 cabai rawit, 2 sdm asam jawa"
            ],
            steps: [
                "Campur ikan tenggiri giling dengan air es, garam, dan penyedap hingga mengental.",
                "Masukkan tepung sagu sedikit demi sedikit, aduk perlahan asal tercampur (jangan diuleni terlalu keras agar tidak keras).",
                "Bentuk adonan memanjang (lenjer) atau bentuk kantung lalu isi kocokan telur (kapal selam).",
                "Rebus dalam air mendidih hingga mengapung, angkat dan tiriskan, lalu goreng hingga keemasan.",
                "Rebus semua bahan cuko hingga mendidih dan saring. Sajikan pempek dengan cuko dan potongan timun."
            ]
        },
        {
            name: "Kerak Telor",
            origin: "DKI Jakarta",
            region: "Jawa",
            image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
            colors: ["#1d4ed8", "#ea580c"],
            shortDesc: "Omelet beras ketan khas Betawi dengan taburan serundeng kelapa sangrai gurih.",
            fullDesc: "Kerak telor adalah kuliner legendaris Betawi berbahan beras ketan putih, telur bebek, ebi, dan serundeng kelapa sangrai.",
            ingredients: [
                "100 gr beras ketan putih (rendam semalaman)",
                "2 butir telur bebek",
                "2 sdm ebi sangrai halus & 3 sdm serundeng kelapa sangrai",
                "Bumbu halus: 3 bawang merah, 2 bawang putih, 2 cm kencur, 1/2 sdt merica, garam secukupnya",
                "Bawang merah goreng untuk taburan"
            ],
            steps: [
                "Panaskan wajan cekung, masukkan 2 sdm beras ketan yang sudah direndam beserta sedikit air rendamannya. Masak hingga setengah matang.",
                "Kocok telur bebek bersama bumbu halus, ebi, dan sebagian serundeng, lalu tuang ke atas ketan di wajan.",
                "Ratakan adonan hingga menutupi permukaan wajan dan biarkan bagian bawahnya mengering membentuk kerak.",
                "Balikkan wajan menghadap bara/api kompor agar bagian atas matang merata dan harum.",
                "Angkat, taburi sisa serundeng dan bawang goreng, lalu sajikan hangat."
            ]
        },
        {
            name: "Gudeg",
            origin: "DI Yogyakarta",
            region: "Jawa",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e40af", "#b45309"],
            shortDesc: "Nangka muda yang dimasak berjam-jam dengan santan dan gula aren hingga manis legit.",
            fullDesc: "Gudeg adalah hidangan khas Yogyakarta berbahan nangka muda (gori) yang dimasak bersama santan, gula aren, dan daun jati.",
            ingredients: [
                "1 kg nangka muda (gori), potong-potong",
                "1 liter santan kelapa & 200 gr gula merah sisir",
                "3 lembar daun jati (untuk warna merah kecokelatan alami), 4 lembar daun salam, 2 ruas lengkuas",
                "Bumbu halus: 10 bawang merah, 6 bawang putih, 6 butir kemiri sangrai, 1 sdm ketumbar, garam"
            ],
            steps: [
                "Alasi dasar panci dengan daun jati dan daun salam, lalu tata potongan nangka muda di atasnya.",
                "Masukkan bumbu halus, lengkuas, gula merah, dan santan hingga nangka terendam.",
                "Masak dengan api kecil dalam panci tertutup selama 3–4 jam hingga santan meresap habis dan nangka berwarna cokelat kemerahan.",
                "Sajikan gudeg bersama nasi hangat, sambal goreng krecek, ayam opor, dan telur pindang."
            ]
        },
        {
            name: "Rawon",
            origin: "Jawa Timur",
            region: "Jawa",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
            colors: ["#0f172a", "#0284c7"],
            shortDesc: "Sup daging sapi berkuah hitam pekat khas dari bumbu kluwek yang kaya rasa.",
            fullDesc: "Rawon adalah sup daging khas Jawa Timur dengan kuah hitam pekat dari buah kluwek yang gurih dan aromatik.",
            ingredients: [
                "500 gr daging sapi sandung lamur, potong dadu",
                "5 buah kluwek tua (ambil isinya dan rendam air hangat)",
                "2 batang serai, 5 lembar daun jeruk, 2 cm lengkuas, 2 batang daun bawang iris",
                "Bumbu halus: 8 bawang merah, 4 bawang putih, 4 kemiri, 1 sdt ketumbar, 2 cm kunyit, terasi bakar",
                "Pelengkap: tauge pendek, telur asin, sambal terasi, kerupuk udang"
            ],
            steps: [
                "Rebus daging sapi hingga empuk, potong dadu, dan saring air kaldunya.",
                "Tumis bumbu halus (termasuk isi kluwek yang sudah dihaluskan) bersama serai, daun jeruk, dan lengkuas hingga harum matang.",
                "Masukkan tumisan bumbu ke dalam panci rebusan kaldu dan daging.",
                "Bumbui dengan garam dan gula, masak hingga bumbu meresap dan masukkan irisan daun bawang.",
                "Sajikan hangat dengan tauge pendek segar, telur asin, dan sambal."
            ]
        },
        {
            name: "Ayam Betutu",
            origin: "Bali",
            region: "Bali & Nusa Tenggara",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
            colors: ["#0369a1", "#ca8a04"],
            shortDesc: "Ayam utuh yang dibaluri bumbu genep khas Bali lalu dipanggang hingga empuk.",
            fullDesc: "Ayam Betutu merupakan sajian upacara dan kuliner khas Bali dengan bumbu lengkap base genep yang kaya rempah.",
            ingredients: [
                "1 ekor ayam kampung utuh",
                "1 ikat daun singkong rebus (untuk isian dalam perut ayam)",
                "Bumbu Base Genep (cincang kasar/halus): 12 bawang merah, 8 bawang putih, 10 cabai rawit, 3 cm kunyit, 3 cm jahe, 3 cm lengkuas, 3 cm kencur, 2 batang serai, 1 sdt terasi bakar, ketumbar, merica"
            ],
            steps: [
                "Tumis bumbu base genep hingga harum dan matang, bagi menjadi dua bagian.",
                "Campur separuh bumbu dengan daun singkong rebus, lalu masukkan ke dalam rongga perut ayam.",
                "Lumuri seluruh permukaan luar ayam dengan sisa bumbu base genep.",
                "Bungkus ayam rapat menggunakan daun pisang atau aluminium foil, kukus selama 1,5 jam hingga empuk.",
                "Panggang sebentar di atas bara/oven agar aroma bakaran keluar, lalu sajikan dengan sambal matah."
            ]
        },
        {
            name: "Ayam Taliwang",
            origin: "Nusa Tenggara Barat (Lombok)",
            region: "Bali & Nusa Tenggara",
            image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e3a8a", "#dc2626"],
            shortDesc: "Ayam bakar muda khas Lombok dengan bumbu cabai, terasi, dan kencur yang pedas.",
            fullDesc: "Ayam Taliwang adalah ayam kampung muda bakar khas Pulau Lombok dengan cita rasa pedas, gurih, dan aroma terasi bakar.",
            ingredients: [
                "1 ekor ayam kampung muda (belah tengah tidak putus / bekakak)",
                "2 buah jeruk limau & 200 ml santan kental",
                "Bumbu halus: 10 cabai merah keriting, 10 cabai rawit merah, 8 bawang merah, 5 bawang putih, 3 cm kencur, 1 sdt terasi bakar Lombok, 1 sdm gula merah, garam"
            ],
            steps: [
                "Lumuri ayam dengan air jeruk limau dan garam, diamkan 15 menit lalu bakar setengah matang.",
                "Tumis bumbu halus hingga harum, tuang santan, masak hingga bumbu mengental dan berminyak.",
                "Oleskan bumbu ke seluruh permukaan ayam bakar setengah matang.",
                "Bakar kembali ayam sambil sesekali diolesi sisa bumbu hingga matang kecokelatan.",
                "Sajikan bersama plecing kangkung dan beberuk terong."
            ]
        },
        {
            name: "Soto Banjar",
            origin: "Kalimantan Selatan",
            region: "Kalimantan",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
            colors: ["#0284c7", "#059669"],
            shortDesc: "Soto ayam beraroma rempah kayu manis, kapulaga, dan cengkeh dengan perkedel kentang.",
            fullDesc: "Soto Banjar adalah soto khas suku Banjar dengan aroma rempah harum seperti kayu manis, kapulaga, dan cengkeh.",
            ingredients: [
                "1/2 ekor ayam kampung, rebus dan suwir dagingnya",
                "Rempah utuh: 4 cm kayu manis, 4 butir kapulaga, 4 butir cengkeh, 1/2 butir biji pala",
                "Bumbu halus: 8 bawang merah, 4 bawang putih, 1/2 sdt merica",
                "2 sdm susu evaporasi / kental manis tawar (untuk kuah keruh gurih khas Banjar)",
                "Pelengkap: ketupat, perkedel kentang, soun, telur rebus, bawang goreng"
            ],
            steps: [
                "Tumis bumbu halus bersama kayu manis, kapulaga, cengkeh, dan pala hingga harum.",
                "Masukkan tumisan rempah ke dalam air kaldu rebusan ayam.",
                "Tambahkan susu evaporasi, garam, dan kaldu bubuk, aduk hingga mendidih.",
                "Tata ketupat, soun, suwiran ayam, telur rebus, dan perkedel kentang di mangkuk.",
                "Siram dengan kuah soto panas dan sajikan dengan sambal serta jeruk nipis."
            ]
        },
        {
            name: "Bubur Pedas",
            origin: "Kalimantan Barat (Sambas)",
            region: "Kalimantan",
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80",
            colors: ["#065f46", "#0284c7"],
            shortDesc: "Bubur beras sangrai yang kaya akan campuran berbagai sayuran segar dan rempah.",
            fullDesc: "Bubur Pedas khas Sambas terbuat dari beras sangrai tumbuk yang dimasak dengan aneka dedaunan herbal dan sayuran segar.",
            ingredients: [
                "200 gr beras, cuci bersih lalu sangrai bersama 100 gr kelapa parut hingga kecokelatan, kemudian tumbuk kasar",
                "Sayuran: kangkung, pakis, daun kesum, kacang panjang, jagung pipil, ubi jalar potong dadu",
                "Bumbu halus: 6 bawang merah, 3 bawang putih, 1 sdt lada hitam, 2 batang serai memarkan",
                "Topping: ikan teri goreng dan kacang tanah goreng"
            ],
            steps: [
                "Rebus air kaldu bersama bumbu halus dan serai hingga mendidih.",
                "Masukkan beras sangrai tumbuk sedikit demi sedikit sambil terus diaduk agar tidak menggumpal.",
                "Masukkan ubi jalar dan jagung terlebih dahulu hingga empuk, lalu masukkan sayuran hijau dan daun kesum.",
                "Masak hingga bubur mengental dan sayuran matang segar.",
                "Sajikan hangat dengan taburan ikan teri goreng dan kacang tanah."
            ]
        },
        {
            name: "Coto Makassar",
            origin: "Sulawesi Selatan",
            region: "Sulawesi",
            image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e40af", "#7c2d12"],
            shortDesc: "Sup daging sapi dengan kuah kental kacang tanah sangrai dan rempah.",
            fullDesc: "Coto Makassar adalah sup daging tradisional Suku Makassar dengan kuah kental gurih dari kacang tanah sangrai halus.",
            ingredients: [
                "500 gr daging sapi",
                "150 gr kacang tanah (sangrai, buang kulit ari, haluskan)",
                "1 liter air cucian beras kedua (tajin) / air kaldu sapi",
                "Bumbu halus: 8 bawang merah, 6 bawang putih, 4 batang serai (ambil putihnya), 3 cm lengkuas, 1 sdm ketumbar sangrai, 1 sdt jintan sangrai, 1/2 sdt merica",
                "Pelengkap: buras atau ketupat, daun bawang, bawang goreng, sambal tauco"
            ],
            steps: [
                "Rebus daging sapi dalam air tajin/kaldu bersama lengkuas hingga empuk, angkat dan potong dadu.",
                "Tumis bumbu halus hingga harum matang, lalu masukkan ke dalam air kaldu rebusan daging.",
                "Masukkan kacang tanah sangrai halus, aduk rata hingga kuah mengental dan berminyak.",
                "Masukkan potongan daging sapi, bumbui garam dan kaldu sapi.",
                "Sajikan dalam mangkuk kecil dengan taburan daun bawang, bawang goreng, dan ketupat."
            ]
        },
        {
            name: "Tinutuan (Bubur Manado)",
            origin: "Sulawesi Utara",
            region: "Sulawesi",
            image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=800&q=80",
            colors: ["#0369a1", "#eab308"],
            shortDesc: "Bubur sehat khas Manado yang memadukan labu kuning, jagung manis, dan sayuran hijau.",
            fullDesc: "Tinutuan adalah bubur sarapan sehat khas Manado yang kaya serat sayuran tanpa daging, disajikan bersama sambal roa.",
            ingredients: [
                "150 gr beras, cuci bersih",
                "250 gr labu kuning (sambiki), kukus dan haluskan sebagian",
                "1 buah jagung manis, pipil bijinya",
                "1 ikat bayam, 1 ikat kangkung, 1 ikat daun kemangi",
                "2 batang serai memarkan & 1 lembar daun kunyit",
                "Pelengkap: sambal roa, ikan asin jambal roti goreng, perkedel jagung"
            ],
            steps: [
                "Rebus beras bersama serai dan daun kunyit hingga menjadi bubur lembut.",
                "Masukkan potongan labu kuning dan jagung manis pipil, aduk hingga bubur berwarna kuning cantik.",
                "Masukkan bayam dan kangkung, bumbui dengan garam secukupnya.",
                "Sesaat sebelum diangkat, masukkan daun kemangi agar aromanya segar.",
                "Sajikan hangat dengan sambal roa dan ikan asin."
            ]
        },
        {
            name: "Ikan Kuah Kuning",
            origin: "Maluku",
            region: "Maluku & Papua",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
            colors: ["#0e7490", "#d97706"],
            shortDesc: "Ikan tongkol atau tuna segar dalam kuah kunyit segar dengan perasan jeruk nipis.",
            fullDesc: "Ikan Kuah Kuning adalah masakan ikan laut khas Maluku dan Papua berkuah kunyit segar tanpa santan, pasangan utama Papeda.",
            ingredients: [
                "500 gr ikan tongkol atau tuna segar, potong-potong",
                "2 buah jeruk nipis & 1 ikat daun kemangi",
                "2 batang serai memarkan, 3 lembar daun jeruk, 10 cabai rawit utuh",
                "Bumbu halus: 6 bawang merah, 3 bawang putih, 4 cm kunyit bakar, 2 cm jahe, 3 butir kemiri sangrai"
            ],
            steps: [
                "Lumuri potongan ikan dengan air jeruk nipis dan garam selama 15 menit untuk menghilangkan bau amis.",
                "Tumis bumbu halus bersama serai dan daun jeruk hingga harum.",
                "Tuang 600 ml air, masak hingga mendidih.",
                "Masukkan potongan ikan dan cabai rawit utuh, masak hingga ikan matang.",
                "Tambahkan perasan jeruk nipis dan daun kemangi sebelum diangkat."
            ]
        },
        {
            name: "Papeda",
            origin: "Papua (Merauke - Jayapura)",
            region: "Maluku & Papua",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
            colors: ["#1d4ed8", "#0891b2"],
            shortDesc: "Bubur sagu bertekstur kenyal seperti lem yang menjadi makanan pokok masyarakat timur.",
            fullDesc: "Papeda adalah makanan pokok khas Papua dan Maluku berbahan pati sagu murni dengan tekstur kenyal dan bening.",
            ingredients: [
                "250 gr tepung pati sagu asli",
                "1 liter air bersih (300 ml suhu ruang untuk melarutkan, 700 ml didihkan)",
                "1/2 sdt garam & 1 sdm air perasan jeruk nipis"
            ],
            steps: [
                "Larutkan tepung sagu dengan 300 ml air suhu ruang, garam, dan air jeruk nipis di dalam mangkuk besar tahan panas. Aduk hingga tidak ada yang menggumpal.",
                "Rebus sisa 700 ml air hingga benar-benar mendidih.",
                "Tuang air mendidih perlahan ke dalam larutan sagu sambil terus diaduk cepat hingga mengental dan berubah warna dari putih susu menjadi bening kenyal.",
                "Gulung papeda menggunakan sepasang sumpit atau garpu, letakkan di piring, dan siram dengan Ikan Kuah Kuning."
            ]
        }
    ];

    // Referensi Elemen DOM
    const foodGrid = document.getElementById("foodGrid");
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const modal = document.getElementById("foodModal");
    const closeModal = document.getElementById("closeModal");
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");
    const topHeader = document.getElementById("topHeader");

    let currentRegion = "Semua";

    // Observer untuk Animasi Scroll Reveal pada Kartu Makanan
    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        }
    );

    // Render Kartu Makanan dengan Foto & Cadangan Anti-Broken
    function renderFoods(data) {
        if (!foodGrid) return;
        foodGrid.innerHTML = "";

        if (data.length === 0) {
            foodGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #cde8ff;">Makanan tidak ditemukan. Coba kata kunci lain!</p>`;
            return;
        }

        data.forEach((food, index) => {
            const card = document.createElement("div");
            card.className = "food-card";
            card.style.transitionDelay = `${(index % 4) * 0.08}s`;

            const imgWrapper = document.createElement("div");
            imgWrapper.className = "img-wrapper";

            const img = document.createElement("img");
            img.src = food.image;
            img.alt = food.name;
            img.loading = "lazy";
            // Jika gambar gagal dimuat (misalnya sedang offline), otomatis ganti ke kartu Canvas
            img.onerror = function () {
                this.onerror = null;
                this.src = generateFallbackArt(food);
            };

            imgWrapper.appendChild(img);

            const cardContent = document.createElement("div");
            cardContent.className = "card-content";
            cardContent.innerHTML = `
                <span class="badge">${food.region}</span>
                <h3>${food.name}</h3>
                <div class="origin">📍 ${food.origin}</div>
                <p>${food.shortDesc}</p>
                <button class="detail-btn">📖 Lihat Resep & Cara Membuat</button>
            `;

            cardContent.querySelector(".detail-btn").addEventListener("click", () => {
                openModal(food);
            });

            card.appendChild(imgWrapper);
            card.appendChild(cardContent);
            foodGrid.appendChild(card);

            cardObserver.observe(card);

            setTimeout(() => {
                card.style.transitionDelay = "0s";
            }, 800);
        });
    }

    // Efek Scroll: Progress Bar, Parallax Header, & Tombol Back-to-Top
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (topHeader && scrollTop < 400) {
            topHeader.style.transform = `translateY(${scrollTop * 0.25}px)`;
            topHeader.style.opacity = `${Math.max(1 - scrollTop / 350, 0.2)}`;
        }

        if (backToTop) {
            if (scrollTop > 350) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Filter & Pencarian
    function filterData() {
        const keyword = searchInput ? searchInput.value.toLowerCase() : "";
        const filtered = foods.filter((food) => {
            const matchRegion = currentRegion === "Semua" || food.region === currentRegion;
            const matchSearch =
                food.name.toLowerCase().includes(keyword) ||
                food.origin.toLowerCase().includes(keyword) ||
                food.shortDesc.toLowerCase().includes(keyword);
            return matchRegion && matchSearch;
        });
        renderFoods(filtered);
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentRegion = btn.getAttribute("data-region");
            filterData();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterData);
    }

    // Buka Modal Resep
    function openModal(food) {
        if (!modal) return;
        const modalImg = document.getElementById("modalImg");
        if (modalImg) {
            modalImg.src = food.image;
            modalImg.alt = food.name;
            modalImg.onerror = function () {
                this.onerror = null;
                this.src = generateFallbackArt(food);
            };
        }

        document.getElementById("modalRegion").textContent = food.region;
        document.getElementById("modalTitle").textContent = food.name;
        document.getElementById("modalOrigin").textContent = "📍 Asal: " + food.origin;
        document.getElementById("modalDesc").textContent = food.fullDesc;

        const ingredientsList = document.getElementById("modalIngredients");
        ingredientsList.innerHTML = "";
        food.ingredients.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            ingredientsList.appendChild(li);
        });

        const stepsList = document.getElementById("modalSteps");
        stepsList.innerHTML = "";
        food.steps.forEach((step) => {
            const li = document.createElement("li");
            li.textContent = step;
            stepsList.appendChild(li);
        });

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function hideModal() {
        if (!modal) return;
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (closeModal) {
        closeModal.addEventListener("click", hideModal);
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("show")) {
            hideModal();
        }
    });

    // Jalankan saat halaman dimuat
    renderFoods(foods);
});