type DateRangeType = {
  startDate: Date;
  endDate: Date;
};

type BanModalType = {
  open: boolean;
  selected: string | null;
  status: string | null;
};

type StatusType = {
  name: string;
  label: string;
};

type RatingType = {
  name: string;
  label: string;
};

type AgeType = {
  startAge: number;
  endAge: number;
  label: string;
};

type PriceType = {
  startPrice: number;
  endPrice: number;
  label: string;
};

type GenderType = {
  id: string;
  label: string;
};
