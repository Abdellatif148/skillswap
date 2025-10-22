const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-90" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10 animate-fade-in-up">
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-4">
          Connecting Learners Around the World
        </h1>
        <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
          SkillSwap empowers anyone to teach and learn without limits.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
