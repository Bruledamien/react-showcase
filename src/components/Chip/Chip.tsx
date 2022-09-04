import "./Chip.scss";

export type TChip = {
  label: string;
  color?: string;
};

const Chip = ({ label, color }: TChip) => {
  return (
    <div className="chip" style={{ color }}>
      {label}
    </div>
  );
};

export default Chip;
