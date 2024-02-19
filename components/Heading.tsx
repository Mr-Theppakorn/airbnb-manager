"use client";

interface HeadingProps {
  title?: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={`text-2xl font-bold ${center ? "text-center" : ""}`}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
