import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#003366] bg-gradient-to-br to-neutral-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center space-x-3">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <div>
                  <svg
                    width={132}
                    height={24}
                    fill="white"
                    viewBox="0 0 132 24"
                    aria-labelledby=":Rphb8ap:"
                    aria-hidden="false"
                    role="img"
                    data-testid="zalando-logo"
                  >
                    <title id=":Rphb8ap:">Zalando wohnen</title>
                    <path
                      fill="#FF4C00"
                      d="M21.803 9.411c-1.69-2.11-4.056-4.157-7.152-6.004l-.012-.006C11.518 1.598 8.591.539 5.95.105 4.299-.166 3.512.15 3.153.36c-.358.21-1.021.746-1.615 2.334C.588 5.238.025 8.343 0 11.994v.013c.025 3.65.587 6.755 1.538 9.299.594 1.588 1.257 2.124 1.615 2.334s1.147.526 2.796.255c2.642-.434 5.569-1.493 8.69-3.295l.012-.007c3.096-1.847 5.461-3.895 7.152-6.004 1.056-1.317 1.181-2.168 1.181-2.59 0-.42-.125-1.271-1.18-2.588"
                    />
                    <path
                      fill="white"
                      d="m28.986 17.42 10.15-9.848h-9.879V5.065h13.805v2.87l-10.15 9.847h10.392v2.508H28.986zM43.787 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.745-2.356-2.477 0-3.867.936-4.109 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.864 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.233 0 5.226-2.206 5.226-4.803M60.13 1.199h3.202v19.09H60.13zM64.389 16.151c0-3.383 2.9-4.32 5.467-4.651l4.773-.605c1.148-.15 1.48-.664 1.48-1.359v-.03c0-1.36-1.178-2.356-3.746-2.356-2.477 0-3.866.936-4.108 2.507h-3.202c.363-3.081 3.051-4.984 7.401-4.984 4.863 0 6.857 2.054 6.857 5.437v10.18h-3.05v-2.417c-1.3 1.873-3.626 2.81-6.254 2.81-3.474 0-5.618-1.752-5.618-4.532m11.72-2.748v-.725c-.513.211-1.087.332-1.722.422l-3.806.514c-1.963.272-2.87.997-2.87 2.326 0 1.42 1.209 2.266 3.172 2.266 3.232 0 5.226-2.206 5.226-4.803M80.73 5.065h3.203v2.477c1.147-1.812 3.322-2.87 5.98-2.87 3.988 0 6.344 2.296 6.344 6.526v9.092h-3.202v-8.64c0-2.809-1.48-4.35-4.199-4.35-2.93 0-4.923 1.964-4.923 4.743v8.247H80.73zM97.315 12.617c0-4.924 3.413-7.945 7.491-7.945 2.447 0 4.562.876 5.83 2.689V1.199h3.202v19.09h-3.202v-2.325c-1.389 1.873-3.383 2.718-5.83 2.718-4.078 0-7.491-3.08-7.491-8.065m13.412.03c0-3.172-1.873-5.377-5.045-5.377-3.141 0-5.044 2.175-5.044 5.347 0 3.202 1.903 5.468 5.044 5.468 3.172 0 5.045-2.266 5.045-5.438M114.896 12.647c0-4.682 3.172-7.974 8.397-7.974 5.257 0 8.398 3.292 8.398 7.974s-3.141 8.036-8.398 8.036c-5.225 0-8.397-3.353-8.397-8.036m13.472 0c0-2.96-1.631-5.376-5.075-5.376s-5.074 2.416-5.074 5.376c0 2.991 1.631 5.438 5.074 5.438 3.444 0 5.075-2.447 5.075-5.438"
                    />
                  </svg>
                </div>
                <div className="mx-4 h-6 w-[1px] bg-primary md:h-8" />
                <div className="capitalize text-primary md:text-xl">
                  Giỏ hàng
                </div>
              </Link>
            </div>
            <p className="mb-6 leading-relaxed text-neutral-300">
              Khám phá thế giới mua sắm trực tuyến với hàng ngàn sản phẩm chất
              lượng, giá tốt nhất và dịch vụ giao hàng miễn phí toàn quốc.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-700 transition-colors duration-200 hover:bg-neutral-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-700 transition-colors duration-200 hover:bg-neutral-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-700 transition-colors duration-200 hover:bg-neutral-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 transition-colors duration-200 hover:text-white"
                >
                  Liên hệ chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-neutral-300">1900-1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-neutral-300">support@zalando.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-neutral-300">
                  Thành phố Hồ Chí Minh, Việt Nam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-neutral-700 pt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <p className="text-sm text-neutral-400">
              © 2024 Zalando. Tất cả quyền được bảo lưu.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a
                href="#"
                className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="#"
                className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
