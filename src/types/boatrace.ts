export type Race = {
  stadium_tel_code: number;
  date: string;
  race_number: number;
  title: string;
  is_course_fixed: boolean;
  is_stabilizer_used: boolean;
  number_of_laps: number;
  betting_deadline_at: string;
  is_canceled: boolean;
};

export type Stadium = {
  tel_code: number;
  name: string;
  prefecture_id: number;
};
