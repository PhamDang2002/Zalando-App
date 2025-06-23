const Loading = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-6">
          <div className="bg-gradient-primary animate-bounce-soft mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
            <svg
              width={32}
              height={32}
              fill="currentColor"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-neutral-700">
            Đang tải dữ liệu...
          </h3>
          <p className="text-sm text-neutral-500">
            Vui lòng chờ trong giây lát
          </p>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots text-brand-600">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
