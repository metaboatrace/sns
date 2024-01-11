import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  date: { input: any; output: any };
  float8: { input: any; output: any };
  timestamp: { input: any; output: any };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations = {
  __typename?: 'boat_betting_contribute_rate_aggregations';
  aggregated_on: Scalars['date']['output'];
  boat_number: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  quinella_rate: Scalars['float8']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Aggregate = {
  __typename?: 'boat_betting_contribute_rate_aggregations_aggregate';
  aggregate?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Aggregate_Fields>;
  nodes: Array<Boat_Betting_Contribute_Rate_Aggregations>;
};

/** aggregate fields of "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Aggregate_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_aggregate_fields';
  avg?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Max_Fields>;
  min?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Min_Fields>;
  stddev?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Stddev_Fields>;
  stddev_pop?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Stddev_Samp_Fields>;
  sum?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Sum_Fields>;
  var_pop?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Var_Pop_Fields>;
  var_samp?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Var_Samp_Fields>;
  variance?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Variance_Fields>;
};

/** aggregate fields of "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Aggregate_FieldsCountArgs =
  {
    columns?: InputMaybe<
      Array<Boat_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    distinct?: InputMaybe<Scalars['Boolean']['input']>;
  };

/** aggregate avg on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Avg_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_avg_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "boat_betting_contribute_rate_aggregations". All fields are combined with a logical 'AND'. */
export type Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp = {
  _and?: InputMaybe<Array<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>>;
  _not?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  _or?: InputMaybe<Array<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>>;
  aggregated_on?: InputMaybe<Date_Comparison_Exp>;
  boat_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  quinella_rate?: InputMaybe<Float8_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  trio_rate?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "boat_betting_contribute_rate_aggregations" */
export enum Boat_Betting_Contribute_Rate_Aggregations_Constraint {
  /** unique or primary key constraint on columns "aggregated_on", "stadium_tel_code", "boat_number" */
  BoatBettingContributeRateAggregationsPkey = 'boat_betting_contribute_rate_aggregations_pkey',
}

/** input type for incrementing numeric columns in table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Inc_Input = {
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Insert_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Max_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_max_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  boat_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Min_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_min_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  boat_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Mutation_Response = {
  __typename?: 'boat_betting_contribute_rate_aggregations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Boat_Betting_Contribute_Rate_Aggregations>;
};

/** on_conflict condition type for table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_On_Conflict = {
  constraint: Boat_Betting_Contribute_Rate_Aggregations_Constraint;
  update_columns?: Array<Boat_Betting_Contribute_Rate_Aggregations_Update_Column>;
  where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

/** Ordering options when selecting data from "boat_betting_contribute_rate_aggregations". */
export type Boat_Betting_Contribute_Rate_Aggregations_Order_By = {
  aggregated_on?: InputMaybe<Order_By>;
  boat_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  quinella_rate?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  trio_rate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: boat_betting_contribute_rate_aggregations */
export type Boat_Betting_Contribute_Rate_Aggregations_Pk_Columns_Input = {
  aggregated_on: Scalars['date']['input'];
  boat_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "boat_betting_contribute_rate_aggregations" */
export enum Boat_Betting_Contribute_Rate_Aggregations_Select_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  BoatNumber = 'boat_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  QuinellaRate = 'quinella_rate',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  TrioRate = 'trio_rate',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Set_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Stddev_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_stddev_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Stddev_Pop_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_stddev_pop_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Stddev_Samp_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_stddev_samp_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "boat_betting_contribute_rate_aggregations" */
export type Boat_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Boat_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Boat_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Value_Input =
  {
    aggregated_on?: InputMaybe<Scalars['date']['input']>;
    boat_number?: InputMaybe<Scalars['Int']['input']>;
    created_at?: InputMaybe<Scalars['timestamp']['input']>;
    quinella_rate?: InputMaybe<Scalars['float8']['input']>;
    stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
    trio_rate?: InputMaybe<Scalars['float8']['input']>;
    updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  };

/** aggregate sum on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Sum_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_sum_fields';
  boat_number?: Maybe<Scalars['Int']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "boat_betting_contribute_rate_aggregations" */
export enum Boat_Betting_Contribute_Rate_Aggregations_Update_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  BoatNumber = 'boat_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  QuinellaRate = 'quinella_rate',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  TrioRate = 'trio_rate',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Boat_Betting_Contribute_Rate_Aggregations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Var_Pop_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_var_pop_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Var_Samp_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_var_samp_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Boat_Betting_Contribute_Rate_Aggregations_Variance_Fields = {
  __typename?: 'boat_betting_contribute_rate_aggregations_variance_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "boat_settings" */
export type Boat_Settings = {
  __typename?: 'boat_settings';
  boat_number?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  is_propeller_renewed?: Maybe<Scalars['Boolean']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  tilt?: Maybe<Scalars['float8']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "boat_settings" */
export type Boat_Settings_Aggregate = {
  __typename?: 'boat_settings_aggregate';
  aggregate?: Maybe<Boat_Settings_Aggregate_Fields>;
  nodes: Array<Boat_Settings>;
};

/** aggregate fields of "boat_settings" */
export type Boat_Settings_Aggregate_Fields = {
  __typename?: 'boat_settings_aggregate_fields';
  avg?: Maybe<Boat_Settings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Boat_Settings_Max_Fields>;
  min?: Maybe<Boat_Settings_Min_Fields>;
  stddev?: Maybe<Boat_Settings_Stddev_Fields>;
  stddev_pop?: Maybe<Boat_Settings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Boat_Settings_Stddev_Samp_Fields>;
  sum?: Maybe<Boat_Settings_Sum_Fields>;
  var_pop?: Maybe<Boat_Settings_Var_Pop_Fields>;
  var_samp?: Maybe<Boat_Settings_Var_Samp_Fields>;
  variance?: Maybe<Boat_Settings_Variance_Fields>;
};

/** aggregate fields of "boat_settings" */
export type Boat_Settings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Boat_Settings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Boat_Settings_Avg_Fields = {
  __typename?: 'boat_settings_avg_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "boat_settings". All fields are combined with a logical 'AND'. */
export type Boat_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Boat_Settings_Bool_Exp>>;
  _not?: InputMaybe<Boat_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Boat_Settings_Bool_Exp>>;
  boat_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  is_propeller_renewed?: InputMaybe<Boolean_Comparison_Exp>;
  motor_number?: InputMaybe<Int_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  tilt?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "boat_settings" */
export enum Boat_Settings_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  BoatSettingsPkey = 'boat_settings_pkey',
}

/** input type for incrementing numeric columns in table "boat_settings" */
export type Boat_Settings_Inc_Input = {
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  tilt?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "boat_settings" */
export type Boat_Settings_Insert_Input = {
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_propeller_renewed?: InputMaybe<Scalars['Boolean']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  tilt?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Boat_Settings_Max_Fields = {
  __typename?: 'boat_settings_max_fields';
  boat_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  tilt?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Boat_Settings_Min_Fields = {
  __typename?: 'boat_settings_min_fields';
  boat_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  tilt?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "boat_settings" */
export type Boat_Settings_Mutation_Response = {
  __typename?: 'boat_settings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Boat_Settings>;
};

/** on_conflict condition type for table "boat_settings" */
export type Boat_Settings_On_Conflict = {
  constraint: Boat_Settings_Constraint;
  update_columns?: Array<Boat_Settings_Update_Column>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

/** Ordering options when selecting data from "boat_settings". */
export type Boat_Settings_Order_By = {
  boat_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  is_propeller_renewed?: InputMaybe<Order_By>;
  motor_number?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  tilt?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: boat_settings */
export type Boat_Settings_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "boat_settings" */
export enum Boat_Settings_Select_Column {
  /** column name */
  BoatNumber = 'boat_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsPropellerRenewed = 'is_propeller_renewed',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  Tilt = 'tilt',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "boat_settings" */
export type Boat_Settings_Set_Input = {
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_propeller_renewed?: InputMaybe<Scalars['Boolean']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  tilt?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Boat_Settings_Stddev_Fields = {
  __typename?: 'boat_settings_stddev_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Boat_Settings_Stddev_Pop_Fields = {
  __typename?: 'boat_settings_stddev_pop_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Boat_Settings_Stddev_Samp_Fields = {
  __typename?: 'boat_settings_stddev_samp_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "boat_settings" */
export type Boat_Settings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Boat_Settings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Boat_Settings_Stream_Cursor_Value_Input = {
  boat_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_propeller_renewed?: InputMaybe<Scalars['Boolean']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  tilt?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Boat_Settings_Sum_Fields = {
  __typename?: 'boat_settings_sum_fields';
  boat_number?: Maybe<Scalars['Int']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  tilt?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "boat_settings" */
export enum Boat_Settings_Update_Column {
  /** column name */
  BoatNumber = 'boat_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsPropellerRenewed = 'is_propeller_renewed',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  Tilt = 'tilt',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Boat_Settings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Boat_Settings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Boat_Settings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Boat_Settings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Boat_Settings_Var_Pop_Fields = {
  __typename?: 'boat_settings_var_pop_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Boat_Settings_Var_Samp_Fields = {
  __typename?: 'boat_settings_var_samp_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Boat_Settings_Variance_Fields = {
  __typename?: 'boat_settings_variance_fields';
  boat_number?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  tilt?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "circumference_exhibition_records" */
export type Circumference_Exhibition_Records = {
  __typename?: 'circumference_exhibition_records';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  exhibition_time: Scalars['float8']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Aggregate = {
  __typename?: 'circumference_exhibition_records_aggregate';
  aggregate?: Maybe<Circumference_Exhibition_Records_Aggregate_Fields>;
  nodes: Array<Circumference_Exhibition_Records>;
};

/** aggregate fields of "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Aggregate_Fields = {
  __typename?: 'circumference_exhibition_records_aggregate_fields';
  avg?: Maybe<Circumference_Exhibition_Records_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Circumference_Exhibition_Records_Max_Fields>;
  min?: Maybe<Circumference_Exhibition_Records_Min_Fields>;
  stddev?: Maybe<Circumference_Exhibition_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Circumference_Exhibition_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Circumference_Exhibition_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Circumference_Exhibition_Records_Sum_Fields>;
  var_pop?: Maybe<Circumference_Exhibition_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Circumference_Exhibition_Records_Var_Samp_Fields>;
  variance?: Maybe<Circumference_Exhibition_Records_Variance_Fields>;
};

/** aggregate fields of "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circumference_Exhibition_Records_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Circumference_Exhibition_Records_Avg_Fields = {
  __typename?: 'circumference_exhibition_records_avg_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "circumference_exhibition_records". All fields are combined with a logical 'AND'. */
export type Circumference_Exhibition_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Circumference_Exhibition_Records_Bool_Exp>>;
  _not?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
  _or?: InputMaybe<Array<Circumference_Exhibition_Records_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  exhibition_time?: InputMaybe<Float8_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "circumference_exhibition_records" */
export enum Circumference_Exhibition_Records_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  CircumferenceExhibitionRecordsPkey = 'circumference_exhibition_records_pkey',
}

/** input type for incrementing numeric columns in table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Inc_Input = {
  exhibition_time?: InputMaybe<Scalars['float8']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exhibition_time?: InputMaybe<Scalars['float8']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Circumference_Exhibition_Records_Max_Fields = {
  __typename?: 'circumference_exhibition_records_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  exhibition_time?: Maybe<Scalars['float8']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Circumference_Exhibition_Records_Min_Fields = {
  __typename?: 'circumference_exhibition_records_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  exhibition_time?: Maybe<Scalars['float8']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Mutation_Response = {
  __typename?: 'circumference_exhibition_records_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Circumference_Exhibition_Records>;
};

/** on_conflict condition type for table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_On_Conflict = {
  constraint: Circumference_Exhibition_Records_Constraint;
  update_columns?: Array<Circumference_Exhibition_Records_Update_Column>;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

/** Ordering options when selecting data from "circumference_exhibition_records". */
export type Circumference_Exhibition_Records_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  exhibition_time?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: circumference_exhibition_records */
export type Circumference_Exhibition_Records_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "circumference_exhibition_records" */
export enum Circumference_Exhibition_Records_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  ExhibitionTime = 'exhibition_time',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exhibition_time?: InputMaybe<Scalars['float8']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Circumference_Exhibition_Records_Stddev_Fields = {
  __typename?: 'circumference_exhibition_records_stddev_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Circumference_Exhibition_Records_Stddev_Pop_Fields = {
  __typename?: 'circumference_exhibition_records_stddev_pop_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Circumference_Exhibition_Records_Stddev_Samp_Fields = {
  __typename?: 'circumference_exhibition_records_stddev_samp_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "circumference_exhibition_records" */
export type Circumference_Exhibition_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circumference_Exhibition_Records_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circumference_Exhibition_Records_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exhibition_time?: InputMaybe<Scalars['float8']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Circumference_Exhibition_Records_Sum_Fields = {
  __typename?: 'circumference_exhibition_records_sum_fields';
  exhibition_time?: Maybe<Scalars['float8']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "circumference_exhibition_records" */
export enum Circumference_Exhibition_Records_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  ExhibitionTime = 'exhibition_time',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Circumference_Exhibition_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Circumference_Exhibition_Records_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circumference_Exhibition_Records_Set_Input>;
  /** filter the rows which have to be updated */
  where: Circumference_Exhibition_Records_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Circumference_Exhibition_Records_Var_Pop_Fields = {
  __typename?: 'circumference_exhibition_records_var_pop_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Circumference_Exhibition_Records_Var_Samp_Fields = {
  __typename?: 'circumference_exhibition_records_var_samp_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Circumference_Exhibition_Records_Variance_Fields = {
  __typename?: 'circumference_exhibition_records_variance_fields';
  exhibition_time?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "disqualified_race_entries" */
export type Disqualified_Race_Entries = {
  __typename?: 'disqualified_race_entries';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  disqualification: Scalars['Int']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "disqualified_race_entries" */
export type Disqualified_Race_Entries_Aggregate = {
  __typename?: 'disqualified_race_entries_aggregate';
  aggregate?: Maybe<Disqualified_Race_Entries_Aggregate_Fields>;
  nodes: Array<Disqualified_Race_Entries>;
};

/** aggregate fields of "disqualified_race_entries" */
export type Disqualified_Race_Entries_Aggregate_Fields = {
  __typename?: 'disqualified_race_entries_aggregate_fields';
  avg?: Maybe<Disqualified_Race_Entries_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Disqualified_Race_Entries_Max_Fields>;
  min?: Maybe<Disqualified_Race_Entries_Min_Fields>;
  stddev?: Maybe<Disqualified_Race_Entries_Stddev_Fields>;
  stddev_pop?: Maybe<Disqualified_Race_Entries_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Disqualified_Race_Entries_Stddev_Samp_Fields>;
  sum?: Maybe<Disqualified_Race_Entries_Sum_Fields>;
  var_pop?: Maybe<Disqualified_Race_Entries_Var_Pop_Fields>;
  var_samp?: Maybe<Disqualified_Race_Entries_Var_Samp_Fields>;
  variance?: Maybe<Disqualified_Race_Entries_Variance_Fields>;
};

/** aggregate fields of "disqualified_race_entries" */
export type Disqualified_Race_Entries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Disqualified_Race_Entries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Disqualified_Race_Entries_Avg_Fields = {
  __typename?: 'disqualified_race_entries_avg_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "disqualified_race_entries". All fields are combined with a logical 'AND'. */
export type Disqualified_Race_Entries_Bool_Exp = {
  _and?: InputMaybe<Array<Disqualified_Race_Entries_Bool_Exp>>;
  _not?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
  _or?: InputMaybe<Array<Disqualified_Race_Entries_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  disqualification?: InputMaybe<Int_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "disqualified_race_entries" */
export enum Disqualified_Race_Entries_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  DisqualifiedRaceEntriesPkey = 'disqualified_race_entries_pkey',
}

/** input type for incrementing numeric columns in table "disqualified_race_entries" */
export type Disqualified_Race_Entries_Inc_Input = {
  disqualification?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "disqualified_race_entries" */
export type Disqualified_Race_Entries_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  disqualification?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Disqualified_Race_Entries_Max_Fields = {
  __typename?: 'disqualified_race_entries_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  disqualification?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Disqualified_Race_Entries_Min_Fields = {
  __typename?: 'disqualified_race_entries_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  disqualification?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "disqualified_race_entries" */
export type Disqualified_Race_Entries_Mutation_Response = {
  __typename?: 'disqualified_race_entries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Disqualified_Race_Entries>;
};

/** on_conflict condition type for table "disqualified_race_entries" */
export type Disqualified_Race_Entries_On_Conflict = {
  constraint: Disqualified_Race_Entries_Constraint;
  update_columns?: Array<Disqualified_Race_Entries_Update_Column>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

/** Ordering options when selecting data from "disqualified_race_entries". */
export type Disqualified_Race_Entries_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  disqualification?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: disqualified_race_entries */
export type Disqualified_Race_Entries_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "disqualified_race_entries" */
export enum Disqualified_Race_Entries_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Disqualification = 'disqualification',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "disqualified_race_entries" */
export type Disqualified_Race_Entries_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  disqualification?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Disqualified_Race_Entries_Stddev_Fields = {
  __typename?: 'disqualified_race_entries_stddev_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Disqualified_Race_Entries_Stddev_Pop_Fields = {
  __typename?: 'disqualified_race_entries_stddev_pop_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Disqualified_Race_Entries_Stddev_Samp_Fields = {
  __typename?: 'disqualified_race_entries_stddev_samp_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "disqualified_race_entries" */
export type Disqualified_Race_Entries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Disqualified_Race_Entries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Disqualified_Race_Entries_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  disqualification?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Disqualified_Race_Entries_Sum_Fields = {
  __typename?: 'disqualified_race_entries_sum_fields';
  disqualification?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "disqualified_race_entries" */
export enum Disqualified_Race_Entries_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Disqualification = 'disqualification',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Disqualified_Race_Entries_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Disqualified_Race_Entries_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Disqualified_Race_Entries_Set_Input>;
  /** filter the rows which have to be updated */
  where: Disqualified_Race_Entries_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Disqualified_Race_Entries_Var_Pop_Fields = {
  __typename?: 'disqualified_race_entries_var_pop_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Disqualified_Race_Entries_Var_Samp_Fields = {
  __typename?: 'disqualified_race_entries_var_samp_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Disqualified_Race_Entries_Variance_Fields = {
  __typename?: 'disqualified_race_entries_variance_fields';
  disqualification?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  created_at: Scalars['timestamp']['output'];
  grade: Scalars['Int']['output'];
  is_canceled: Scalars['Boolean']['output'];
  kind: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  starts_on: Scalars['date']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  grade?: InputMaybe<Int_Comparison_Exp>;
  is_canceled?: InputMaybe<Boolean_Comparison_Exp>;
  kind?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  starts_on?: InputMaybe<Date_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "starts_on", "stadium_tel_code", "title" */
  EventsPkey = 'events_pkey',
}

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  grade?: InputMaybe<Scalars['Int']['input']>;
  kind?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['Int']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  starts_on?: InputMaybe<Scalars['date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  grade?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  starts_on?: Maybe<Scalars['date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  grade?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  starts_on?: Maybe<Scalars['date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  created_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  is_canceled?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  starts_on?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  stadium_tel_code: Scalars['Int']['input'];
  starts_on: Scalars['date']['input'];
  title: Scalars['String']['input'];
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  IsCanceled = 'is_canceled',
  /** column name */
  Kind = 'kind',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartsOn = 'starts_on',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['Int']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  starts_on?: InputMaybe<Scalars['date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['Int']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  starts_on?: InputMaybe<Scalars['date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  grade?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Grade = 'grade',
  /** column name */
  IsCanceled = 'is_canceled',
  /** column name */
  Kind = 'kind',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartsOn = 'starts_on',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Events_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Events_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  grade?: Maybe<Scalars['Float']['output']>;
  kind?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

/** columns and relationships of "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations = {
  __typename?: 'motor_betting_contribute_rate_aggregations';
  aggregated_on: Scalars['date']['output'];
  created_at: Scalars['timestamp']['output'];
  motor_number: Scalars['Int']['output'];
  quinella_rate: Scalars['float8']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Aggregate = {
  __typename?: 'motor_betting_contribute_rate_aggregations_aggregate';
  aggregate?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Aggregate_Fields>;
  nodes: Array<Motor_Betting_Contribute_Rate_Aggregations>;
};

/** aggregate fields of "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Aggregate_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_aggregate_fields';
  avg?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Max_Fields>;
  min?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Min_Fields>;
  stddev?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Stddev_Fields>;
  stddev_pop?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Stddev_Samp_Fields>;
  sum?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Sum_Fields>;
  var_pop?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Var_Pop_Fields>;
  var_samp?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Var_Samp_Fields>;
  variance?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Variance_Fields>;
};

/** aggregate fields of "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Aggregate_FieldsCountArgs =
  {
    columns?: InputMaybe<
      Array<Motor_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    distinct?: InputMaybe<Scalars['Boolean']['input']>;
  };

/** aggregate avg on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Avg_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_avg_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "motor_betting_contribute_rate_aggregations". All fields are combined with a logical 'AND'. */
export type Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp = {
  _and?: InputMaybe<Array<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>>;
  _not?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  _or?: InputMaybe<Array<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>>;
  aggregated_on?: InputMaybe<Date_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  motor_number?: InputMaybe<Int_Comparison_Exp>;
  quinella_rate?: InputMaybe<Float8_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  trio_rate?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "motor_betting_contribute_rate_aggregations" */
export enum Motor_Betting_Contribute_Rate_Aggregations_Constraint {
  /** unique or primary key constraint on columns "aggregated_on", "stadium_tel_code", "motor_number" */
  MotorBettingContributeRateAggregationsPkey = 'motor_betting_contribute_rate_aggregations_pkey',
}

/** input type for incrementing numeric columns in table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Inc_Input = {
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Insert_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Max_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_max_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Min_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_min_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Mutation_Response = {
  __typename?: 'motor_betting_contribute_rate_aggregations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Motor_Betting_Contribute_Rate_Aggregations>;
};

/** on_conflict condition type for table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_On_Conflict = {
  constraint: Motor_Betting_Contribute_Rate_Aggregations_Constraint;
  update_columns?: Array<Motor_Betting_Contribute_Rate_Aggregations_Update_Column>;
  where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

/** Ordering options when selecting data from "motor_betting_contribute_rate_aggregations". */
export type Motor_Betting_Contribute_Rate_Aggregations_Order_By = {
  aggregated_on?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  motor_number?: InputMaybe<Order_By>;
  quinella_rate?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  trio_rate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: motor_betting_contribute_rate_aggregations */
export type Motor_Betting_Contribute_Rate_Aggregations_Pk_Columns_Input = {
  aggregated_on: Scalars['date']['input'];
  motor_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "motor_betting_contribute_rate_aggregations" */
export enum Motor_Betting_Contribute_Rate_Aggregations_Select_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  QuinellaRate = 'quinella_rate',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  TrioRate = 'trio_rate',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Set_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quinella_rate?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  trio_rate?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Stddev_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_stddev_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Stddev_Pop_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_stddev_pop_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Stddev_Samp_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_stddev_samp_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "motor_betting_contribute_rate_aggregations" */
export type Motor_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Motor_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Motor_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Value_Input =
  {
    aggregated_on?: InputMaybe<Scalars['date']['input']>;
    created_at?: InputMaybe<Scalars['timestamp']['input']>;
    motor_number?: InputMaybe<Scalars['Int']['input']>;
    quinella_rate?: InputMaybe<Scalars['float8']['input']>;
    stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
    trio_rate?: InputMaybe<Scalars['float8']['input']>;
    updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  };

/** aggregate sum on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Sum_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_sum_fields';
  motor_number?: Maybe<Scalars['Int']['output']>;
  quinella_rate?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  trio_rate?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "motor_betting_contribute_rate_aggregations" */
export enum Motor_Betting_Contribute_Rate_Aggregations_Update_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  QuinellaRate = 'quinella_rate',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  TrioRate = 'trio_rate',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Motor_Betting_Contribute_Rate_Aggregations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Var_Pop_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_var_pop_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Var_Samp_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_var_samp_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Motor_Betting_Contribute_Rate_Aggregations_Variance_Fields = {
  __typename?: 'motor_betting_contribute_rate_aggregations_variance_fields';
  motor_number?: Maybe<Scalars['Float']['output']>;
  quinella_rate?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  trio_rate?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "motor_maintenances" */
export type Motor_Maintenances = {
  __typename?: 'motor_maintenances';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  exchanged_parts: Scalars['Int']['output'];
  motor_number: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "motor_maintenances" */
export type Motor_Maintenances_Aggregate = {
  __typename?: 'motor_maintenances_aggregate';
  aggregate?: Maybe<Motor_Maintenances_Aggregate_Fields>;
  nodes: Array<Motor_Maintenances>;
};

/** aggregate fields of "motor_maintenances" */
export type Motor_Maintenances_Aggregate_Fields = {
  __typename?: 'motor_maintenances_aggregate_fields';
  avg?: Maybe<Motor_Maintenances_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Motor_Maintenances_Max_Fields>;
  min?: Maybe<Motor_Maintenances_Min_Fields>;
  stddev?: Maybe<Motor_Maintenances_Stddev_Fields>;
  stddev_pop?: Maybe<Motor_Maintenances_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Motor_Maintenances_Stddev_Samp_Fields>;
  sum?: Maybe<Motor_Maintenances_Sum_Fields>;
  var_pop?: Maybe<Motor_Maintenances_Var_Pop_Fields>;
  var_samp?: Maybe<Motor_Maintenances_Var_Samp_Fields>;
  variance?: Maybe<Motor_Maintenances_Variance_Fields>;
};

/** aggregate fields of "motor_maintenances" */
export type Motor_Maintenances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Motor_Maintenances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Motor_Maintenances_Avg_Fields = {
  __typename?: 'motor_maintenances_avg_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "motor_maintenances". All fields are combined with a logical 'AND'. */
export type Motor_Maintenances_Bool_Exp = {
  _and?: InputMaybe<Array<Motor_Maintenances_Bool_Exp>>;
  _not?: InputMaybe<Motor_Maintenances_Bool_Exp>;
  _or?: InputMaybe<Array<Motor_Maintenances_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  exchanged_parts?: InputMaybe<Int_Comparison_Exp>;
  motor_number?: InputMaybe<Int_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "motor_maintenances" */
export enum Motor_Maintenances_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "exchanged_parts", "date", "race_number", "motor_number" */
  MotorMaintenancesPkey = 'motor_maintenances_pkey',
}

/** input type for incrementing numeric columns in table "motor_maintenances" */
export type Motor_Maintenances_Inc_Input = {
  exchanged_parts?: InputMaybe<Scalars['Int']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "motor_maintenances" */
export type Motor_Maintenances_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exchanged_parts?: InputMaybe<Scalars['Int']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Motor_Maintenances_Max_Fields = {
  __typename?: 'motor_maintenances_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  exchanged_parts?: Maybe<Scalars['Int']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Motor_Maintenances_Min_Fields = {
  __typename?: 'motor_maintenances_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  exchanged_parts?: Maybe<Scalars['Int']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "motor_maintenances" */
export type Motor_Maintenances_Mutation_Response = {
  __typename?: 'motor_maintenances_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Motor_Maintenances>;
};

/** on_conflict condition type for table "motor_maintenances" */
export type Motor_Maintenances_On_Conflict = {
  constraint: Motor_Maintenances_Constraint;
  update_columns?: Array<Motor_Maintenances_Update_Column>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

/** Ordering options when selecting data from "motor_maintenances". */
export type Motor_Maintenances_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  exchanged_parts?: InputMaybe<Order_By>;
  motor_number?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: motor_maintenances */
export type Motor_Maintenances_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  exchanged_parts: Scalars['Int']['input'];
  motor_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "motor_maintenances" */
export enum Motor_Maintenances_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  ExchangedParts = 'exchanged_parts',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "motor_maintenances" */
export type Motor_Maintenances_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exchanged_parts?: InputMaybe<Scalars['Int']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Motor_Maintenances_Stddev_Fields = {
  __typename?: 'motor_maintenances_stddev_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Motor_Maintenances_Stddev_Pop_Fields = {
  __typename?: 'motor_maintenances_stddev_pop_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Motor_Maintenances_Stddev_Samp_Fields = {
  __typename?: 'motor_maintenances_stddev_samp_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "motor_maintenances" */
export type Motor_Maintenances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Motor_Maintenances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Motor_Maintenances_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  exchanged_parts?: InputMaybe<Scalars['Int']['input']>;
  motor_number?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Motor_Maintenances_Sum_Fields = {
  __typename?: 'motor_maintenances_sum_fields';
  exchanged_parts?: Maybe<Scalars['Int']['output']>;
  motor_number?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "motor_maintenances" */
export enum Motor_Maintenances_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  ExchangedParts = 'exchanged_parts',
  /** column name */
  MotorNumber = 'motor_number',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Motor_Maintenances_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Motor_Maintenances_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Motor_Maintenances_Set_Input>;
  /** filter the rows which have to be updated */
  where: Motor_Maintenances_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Motor_Maintenances_Var_Pop_Fields = {
  __typename?: 'motor_maintenances_var_pop_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Motor_Maintenances_Var_Samp_Fields = {
  __typename?: 'motor_maintenances_var_samp_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Motor_Maintenances_Variance_Fields = {
  __typename?: 'motor_maintenances_variance_fields';
  exchanged_parts?: Maybe<Scalars['Float']['output']>;
  motor_number?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "motor_renewals" */
export type Motor_Renewals = {
  __typename?: 'motor_renewals';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "motor_renewals" */
export type Motor_Renewals_Aggregate = {
  __typename?: 'motor_renewals_aggregate';
  aggregate?: Maybe<Motor_Renewals_Aggregate_Fields>;
  nodes: Array<Motor_Renewals>;
};

/** aggregate fields of "motor_renewals" */
export type Motor_Renewals_Aggregate_Fields = {
  __typename?: 'motor_renewals_aggregate_fields';
  avg?: Maybe<Motor_Renewals_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Motor_Renewals_Max_Fields>;
  min?: Maybe<Motor_Renewals_Min_Fields>;
  stddev?: Maybe<Motor_Renewals_Stddev_Fields>;
  stddev_pop?: Maybe<Motor_Renewals_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Motor_Renewals_Stddev_Samp_Fields>;
  sum?: Maybe<Motor_Renewals_Sum_Fields>;
  var_pop?: Maybe<Motor_Renewals_Var_Pop_Fields>;
  var_samp?: Maybe<Motor_Renewals_Var_Samp_Fields>;
  variance?: Maybe<Motor_Renewals_Variance_Fields>;
};

/** aggregate fields of "motor_renewals" */
export type Motor_Renewals_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Motor_Renewals_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Motor_Renewals_Avg_Fields = {
  __typename?: 'motor_renewals_avg_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "motor_renewals". All fields are combined with a logical 'AND'. */
export type Motor_Renewals_Bool_Exp = {
  _and?: InputMaybe<Array<Motor_Renewals_Bool_Exp>>;
  _not?: InputMaybe<Motor_Renewals_Bool_Exp>;
  _or?: InputMaybe<Array<Motor_Renewals_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "motor_renewals" */
export enum Motor_Renewals_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date" */
  MotorRenewalsPkey = 'motor_renewals_pkey',
}

/** input type for incrementing numeric columns in table "motor_renewals" */
export type Motor_Renewals_Inc_Input = {
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "motor_renewals" */
export type Motor_Renewals_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Motor_Renewals_Max_Fields = {
  __typename?: 'motor_renewals_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Motor_Renewals_Min_Fields = {
  __typename?: 'motor_renewals_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "motor_renewals" */
export type Motor_Renewals_Mutation_Response = {
  __typename?: 'motor_renewals_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Motor_Renewals>;
};

/** on_conflict condition type for table "motor_renewals" */
export type Motor_Renewals_On_Conflict = {
  constraint: Motor_Renewals_Constraint;
  update_columns?: Array<Motor_Renewals_Update_Column>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

/** Ordering options when selecting data from "motor_renewals". */
export type Motor_Renewals_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: motor_renewals */
export type Motor_Renewals_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "motor_renewals" */
export enum Motor_Renewals_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "motor_renewals" */
export type Motor_Renewals_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Motor_Renewals_Stddev_Fields = {
  __typename?: 'motor_renewals_stddev_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Motor_Renewals_Stddev_Pop_Fields = {
  __typename?: 'motor_renewals_stddev_pop_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Motor_Renewals_Stddev_Samp_Fields = {
  __typename?: 'motor_renewals_stddev_samp_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "motor_renewals" */
export type Motor_Renewals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Motor_Renewals_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Motor_Renewals_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Motor_Renewals_Sum_Fields = {
  __typename?: 'motor_renewals_sum_fields';
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "motor_renewals" */
export enum Motor_Renewals_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Motor_Renewals_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Motor_Renewals_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Motor_Renewals_Set_Input>;
  /** filter the rows which have to be updated */
  where: Motor_Renewals_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Motor_Renewals_Var_Pop_Fields = {
  __typename?: 'motor_renewals_var_pop_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Motor_Renewals_Var_Samp_Fields = {
  __typename?: 'motor_renewals_var_samp_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Motor_Renewals_Variance_Fields = {
  __typename?: 'motor_renewals_variance_fields';
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "boat_betting_contribute_rate_aggregations" */
  delete_boat_betting_contribute_rate_aggregations?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** delete single row from the table: "boat_betting_contribute_rate_aggregations" */
  delete_boat_betting_contribute_rate_aggregations_by_pk?: Maybe<Boat_Betting_Contribute_Rate_Aggregations>;
  /** delete data from the table: "boat_settings" */
  delete_boat_settings?: Maybe<Boat_Settings_Mutation_Response>;
  /** delete single row from the table: "boat_settings" */
  delete_boat_settings_by_pk?: Maybe<Boat_Settings>;
  /** delete data from the table: "circumference_exhibition_records" */
  delete_circumference_exhibition_records?: Maybe<Circumference_Exhibition_Records_Mutation_Response>;
  /** delete single row from the table: "circumference_exhibition_records" */
  delete_circumference_exhibition_records_by_pk?: Maybe<Circumference_Exhibition_Records>;
  /** delete data from the table: "disqualified_race_entries" */
  delete_disqualified_race_entries?: Maybe<Disqualified_Race_Entries_Mutation_Response>;
  /** delete single row from the table: "disqualified_race_entries" */
  delete_disqualified_race_entries_by_pk?: Maybe<Disqualified_Race_Entries>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "motor_betting_contribute_rate_aggregations" */
  delete_motor_betting_contribute_rate_aggregations?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** delete single row from the table: "motor_betting_contribute_rate_aggregations" */
  delete_motor_betting_contribute_rate_aggregations_by_pk?: Maybe<Motor_Betting_Contribute_Rate_Aggregations>;
  /** delete data from the table: "motor_maintenances" */
  delete_motor_maintenances?: Maybe<Motor_Maintenances_Mutation_Response>;
  /** delete single row from the table: "motor_maintenances" */
  delete_motor_maintenances_by_pk?: Maybe<Motor_Maintenances>;
  /** delete data from the table: "motor_renewals" */
  delete_motor_renewals?: Maybe<Motor_Renewals_Mutation_Response>;
  /** delete single row from the table: "motor_renewals" */
  delete_motor_renewals_by_pk?: Maybe<Motor_Renewals>;
  /** delete data from the table: "odds" */
  delete_odds?: Maybe<Odds_Mutation_Response>;
  /** delete single row from the table: "odds" */
  delete_odds_by_pk?: Maybe<Odds>;
  /** delete data from the table: "payoffs" */
  delete_payoffs?: Maybe<Payoffs_Mutation_Response>;
  /** delete single row from the table: "payoffs" */
  delete_payoffs_by_pk?: Maybe<Payoffs>;
  /** delete data from the table: "race_entries" */
  delete_race_entries?: Maybe<Race_Entries_Mutation_Response>;
  /** delete single row from the table: "race_entries" */
  delete_race_entries_by_pk?: Maybe<Race_Entries>;
  /** delete data from the table: "race_records" */
  delete_race_records?: Maybe<Race_Records_Mutation_Response>;
  /** delete single row from the table: "race_records" */
  delete_race_records_by_pk?: Maybe<Race_Records>;
  /** delete data from the table: "racer_conditions" */
  delete_racer_conditions?: Maybe<Racer_Conditions_Mutation_Response>;
  /** delete single row from the table: "racer_conditions" */
  delete_racer_conditions_by_pk?: Maybe<Racer_Conditions>;
  /** delete data from the table: "racer_winning_rate_aggregations" */
  delete_racer_winning_rate_aggregations?: Maybe<Racer_Winning_Rate_Aggregations_Mutation_Response>;
  /** delete single row from the table: "racer_winning_rate_aggregations" */
  delete_racer_winning_rate_aggregations_by_pk?: Maybe<Racer_Winning_Rate_Aggregations>;
  /** delete data from the table: "racers" */
  delete_racers?: Maybe<Racers_Mutation_Response>;
  /** delete single row from the table: "racers" */
  delete_racers_by_pk?: Maybe<Racers>;
  /** delete data from the table: "races" */
  delete_races?: Maybe<Races_Mutation_Response>;
  /** delete single row from the table: "races" */
  delete_races_by_pk?: Maybe<Races>;
  /** delete data from the table: "stadiums" */
  delete_stadiums?: Maybe<Stadiums_Mutation_Response>;
  /** delete single row from the table: "stadiums" */
  delete_stadiums_by_pk?: Maybe<Stadiums>;
  /** delete data from the table: "start_exhibition_records" */
  delete_start_exhibition_records?: Maybe<Start_Exhibition_Records_Mutation_Response>;
  /** delete single row from the table: "start_exhibition_records" */
  delete_start_exhibition_records_by_pk?: Maybe<Start_Exhibition_Records>;
  /** delete data from the table: "weather_conditions" */
  delete_weather_conditions?: Maybe<Weather_Conditions_Mutation_Response>;
  /** delete single row from the table: "weather_conditions" */
  delete_weather_conditions_by_pk?: Maybe<Weather_Conditions>;
  /** delete data from the table: "winning_race_entries" */
  delete_winning_race_entries?: Maybe<Winning_Race_Entries_Mutation_Response>;
  /** delete single row from the table: "winning_race_entries" */
  delete_winning_race_entries_by_pk?: Maybe<Winning_Race_Entries>;
  /** insert data into the table: "boat_betting_contribute_rate_aggregations" */
  insert_boat_betting_contribute_rate_aggregations?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** insert a single row into the table: "boat_betting_contribute_rate_aggregations" */
  insert_boat_betting_contribute_rate_aggregations_one?: Maybe<Boat_Betting_Contribute_Rate_Aggregations>;
  /** insert data into the table: "boat_settings" */
  insert_boat_settings?: Maybe<Boat_Settings_Mutation_Response>;
  /** insert a single row into the table: "boat_settings" */
  insert_boat_settings_one?: Maybe<Boat_Settings>;
  /** insert data into the table: "circumference_exhibition_records" */
  insert_circumference_exhibition_records?: Maybe<Circumference_Exhibition_Records_Mutation_Response>;
  /** insert a single row into the table: "circumference_exhibition_records" */
  insert_circumference_exhibition_records_one?: Maybe<Circumference_Exhibition_Records>;
  /** insert data into the table: "disqualified_race_entries" */
  insert_disqualified_race_entries?: Maybe<Disqualified_Race_Entries_Mutation_Response>;
  /** insert a single row into the table: "disqualified_race_entries" */
  insert_disqualified_race_entries_one?: Maybe<Disqualified_Race_Entries>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "motor_betting_contribute_rate_aggregations" */
  insert_motor_betting_contribute_rate_aggregations?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** insert a single row into the table: "motor_betting_contribute_rate_aggregations" */
  insert_motor_betting_contribute_rate_aggregations_one?: Maybe<Motor_Betting_Contribute_Rate_Aggregations>;
  /** insert data into the table: "motor_maintenances" */
  insert_motor_maintenances?: Maybe<Motor_Maintenances_Mutation_Response>;
  /** insert a single row into the table: "motor_maintenances" */
  insert_motor_maintenances_one?: Maybe<Motor_Maintenances>;
  /** insert data into the table: "motor_renewals" */
  insert_motor_renewals?: Maybe<Motor_Renewals_Mutation_Response>;
  /** insert a single row into the table: "motor_renewals" */
  insert_motor_renewals_one?: Maybe<Motor_Renewals>;
  /** insert data into the table: "odds" */
  insert_odds?: Maybe<Odds_Mutation_Response>;
  /** insert a single row into the table: "odds" */
  insert_odds_one?: Maybe<Odds>;
  /** insert data into the table: "payoffs" */
  insert_payoffs?: Maybe<Payoffs_Mutation_Response>;
  /** insert a single row into the table: "payoffs" */
  insert_payoffs_one?: Maybe<Payoffs>;
  /** insert data into the table: "race_entries" */
  insert_race_entries?: Maybe<Race_Entries_Mutation_Response>;
  /** insert a single row into the table: "race_entries" */
  insert_race_entries_one?: Maybe<Race_Entries>;
  /** insert data into the table: "race_records" */
  insert_race_records?: Maybe<Race_Records_Mutation_Response>;
  /** insert a single row into the table: "race_records" */
  insert_race_records_one?: Maybe<Race_Records>;
  /** insert data into the table: "racer_conditions" */
  insert_racer_conditions?: Maybe<Racer_Conditions_Mutation_Response>;
  /** insert a single row into the table: "racer_conditions" */
  insert_racer_conditions_one?: Maybe<Racer_Conditions>;
  /** insert data into the table: "racer_winning_rate_aggregations" */
  insert_racer_winning_rate_aggregations?: Maybe<Racer_Winning_Rate_Aggregations_Mutation_Response>;
  /** insert a single row into the table: "racer_winning_rate_aggregations" */
  insert_racer_winning_rate_aggregations_one?: Maybe<Racer_Winning_Rate_Aggregations>;
  /** insert data into the table: "racers" */
  insert_racers?: Maybe<Racers_Mutation_Response>;
  /** insert a single row into the table: "racers" */
  insert_racers_one?: Maybe<Racers>;
  /** insert data into the table: "races" */
  insert_races?: Maybe<Races_Mutation_Response>;
  /** insert a single row into the table: "races" */
  insert_races_one?: Maybe<Races>;
  /** insert data into the table: "stadiums" */
  insert_stadiums?: Maybe<Stadiums_Mutation_Response>;
  /** insert a single row into the table: "stadiums" */
  insert_stadiums_one?: Maybe<Stadiums>;
  /** insert data into the table: "start_exhibition_records" */
  insert_start_exhibition_records?: Maybe<Start_Exhibition_Records_Mutation_Response>;
  /** insert a single row into the table: "start_exhibition_records" */
  insert_start_exhibition_records_one?: Maybe<Start_Exhibition_Records>;
  /** insert data into the table: "weather_conditions" */
  insert_weather_conditions?: Maybe<Weather_Conditions_Mutation_Response>;
  /** insert a single row into the table: "weather_conditions" */
  insert_weather_conditions_one?: Maybe<Weather_Conditions>;
  /** insert data into the table: "winning_race_entries" */
  insert_winning_race_entries?: Maybe<Winning_Race_Entries_Mutation_Response>;
  /** insert a single row into the table: "winning_race_entries" */
  insert_winning_race_entries_one?: Maybe<Winning_Race_Entries>;
  /** update data of the table: "boat_betting_contribute_rate_aggregations" */
  update_boat_betting_contribute_rate_aggregations?: Maybe<Boat_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** update single row of the table: "boat_betting_contribute_rate_aggregations" */
  update_boat_betting_contribute_rate_aggregations_by_pk?: Maybe<Boat_Betting_Contribute_Rate_Aggregations>;
  /** update multiples rows of table: "boat_betting_contribute_rate_aggregations" */
  update_boat_betting_contribute_rate_aggregations_many?: Maybe<
    Array<Maybe<Boat_Betting_Contribute_Rate_Aggregations_Mutation_Response>>
  >;
  /** update data of the table: "boat_settings" */
  update_boat_settings?: Maybe<Boat_Settings_Mutation_Response>;
  /** update single row of the table: "boat_settings" */
  update_boat_settings_by_pk?: Maybe<Boat_Settings>;
  /** update multiples rows of table: "boat_settings" */
  update_boat_settings_many?: Maybe<
    Array<Maybe<Boat_Settings_Mutation_Response>>
  >;
  /** update data of the table: "circumference_exhibition_records" */
  update_circumference_exhibition_records?: Maybe<Circumference_Exhibition_Records_Mutation_Response>;
  /** update single row of the table: "circumference_exhibition_records" */
  update_circumference_exhibition_records_by_pk?: Maybe<Circumference_Exhibition_Records>;
  /** update multiples rows of table: "circumference_exhibition_records" */
  update_circumference_exhibition_records_many?: Maybe<
    Array<Maybe<Circumference_Exhibition_Records_Mutation_Response>>
  >;
  /** update data of the table: "disqualified_race_entries" */
  update_disqualified_race_entries?: Maybe<Disqualified_Race_Entries_Mutation_Response>;
  /** update single row of the table: "disqualified_race_entries" */
  update_disqualified_race_entries_by_pk?: Maybe<Disqualified_Race_Entries>;
  /** update multiples rows of table: "disqualified_race_entries" */
  update_disqualified_race_entries_many?: Maybe<
    Array<Maybe<Disqualified_Race_Entries_Mutation_Response>>
  >;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Array<Maybe<Events_Mutation_Response>>>;
  /** update data of the table: "motor_betting_contribute_rate_aggregations" */
  update_motor_betting_contribute_rate_aggregations?: Maybe<Motor_Betting_Contribute_Rate_Aggregations_Mutation_Response>;
  /** update single row of the table: "motor_betting_contribute_rate_aggregations" */
  update_motor_betting_contribute_rate_aggregations_by_pk?: Maybe<Motor_Betting_Contribute_Rate_Aggregations>;
  /** update multiples rows of table: "motor_betting_contribute_rate_aggregations" */
  update_motor_betting_contribute_rate_aggregations_many?: Maybe<
    Array<Maybe<Motor_Betting_Contribute_Rate_Aggregations_Mutation_Response>>
  >;
  /** update data of the table: "motor_maintenances" */
  update_motor_maintenances?: Maybe<Motor_Maintenances_Mutation_Response>;
  /** update single row of the table: "motor_maintenances" */
  update_motor_maintenances_by_pk?: Maybe<Motor_Maintenances>;
  /** update multiples rows of table: "motor_maintenances" */
  update_motor_maintenances_many?: Maybe<
    Array<Maybe<Motor_Maintenances_Mutation_Response>>
  >;
  /** update data of the table: "motor_renewals" */
  update_motor_renewals?: Maybe<Motor_Renewals_Mutation_Response>;
  /** update single row of the table: "motor_renewals" */
  update_motor_renewals_by_pk?: Maybe<Motor_Renewals>;
  /** update multiples rows of table: "motor_renewals" */
  update_motor_renewals_many?: Maybe<
    Array<Maybe<Motor_Renewals_Mutation_Response>>
  >;
  /** update data of the table: "odds" */
  update_odds?: Maybe<Odds_Mutation_Response>;
  /** update single row of the table: "odds" */
  update_odds_by_pk?: Maybe<Odds>;
  /** update multiples rows of table: "odds" */
  update_odds_many?: Maybe<Array<Maybe<Odds_Mutation_Response>>>;
  /** update data of the table: "payoffs" */
  update_payoffs?: Maybe<Payoffs_Mutation_Response>;
  /** update single row of the table: "payoffs" */
  update_payoffs_by_pk?: Maybe<Payoffs>;
  /** update multiples rows of table: "payoffs" */
  update_payoffs_many?: Maybe<Array<Maybe<Payoffs_Mutation_Response>>>;
  /** update data of the table: "race_entries" */
  update_race_entries?: Maybe<Race_Entries_Mutation_Response>;
  /** update single row of the table: "race_entries" */
  update_race_entries_by_pk?: Maybe<Race_Entries>;
  /** update multiples rows of table: "race_entries" */
  update_race_entries_many?: Maybe<
    Array<Maybe<Race_Entries_Mutation_Response>>
  >;
  /** update data of the table: "race_records" */
  update_race_records?: Maybe<Race_Records_Mutation_Response>;
  /** update single row of the table: "race_records" */
  update_race_records_by_pk?: Maybe<Race_Records>;
  /** update multiples rows of table: "race_records" */
  update_race_records_many?: Maybe<
    Array<Maybe<Race_Records_Mutation_Response>>
  >;
  /** update data of the table: "racer_conditions" */
  update_racer_conditions?: Maybe<Racer_Conditions_Mutation_Response>;
  /** update single row of the table: "racer_conditions" */
  update_racer_conditions_by_pk?: Maybe<Racer_Conditions>;
  /** update multiples rows of table: "racer_conditions" */
  update_racer_conditions_many?: Maybe<
    Array<Maybe<Racer_Conditions_Mutation_Response>>
  >;
  /** update data of the table: "racer_winning_rate_aggregations" */
  update_racer_winning_rate_aggregations?: Maybe<Racer_Winning_Rate_Aggregations_Mutation_Response>;
  /** update single row of the table: "racer_winning_rate_aggregations" */
  update_racer_winning_rate_aggregations_by_pk?: Maybe<Racer_Winning_Rate_Aggregations>;
  /** update multiples rows of table: "racer_winning_rate_aggregations" */
  update_racer_winning_rate_aggregations_many?: Maybe<
    Array<Maybe<Racer_Winning_Rate_Aggregations_Mutation_Response>>
  >;
  /** update data of the table: "racers" */
  update_racers?: Maybe<Racers_Mutation_Response>;
  /** update single row of the table: "racers" */
  update_racers_by_pk?: Maybe<Racers>;
  /** update multiples rows of table: "racers" */
  update_racers_many?: Maybe<Array<Maybe<Racers_Mutation_Response>>>;
  /** update data of the table: "races" */
  update_races?: Maybe<Races_Mutation_Response>;
  /** update single row of the table: "races" */
  update_races_by_pk?: Maybe<Races>;
  /** update multiples rows of table: "races" */
  update_races_many?: Maybe<Array<Maybe<Races_Mutation_Response>>>;
  /** update data of the table: "stadiums" */
  update_stadiums?: Maybe<Stadiums_Mutation_Response>;
  /** update single row of the table: "stadiums" */
  update_stadiums_by_pk?: Maybe<Stadiums>;
  /** update multiples rows of table: "stadiums" */
  update_stadiums_many?: Maybe<Array<Maybe<Stadiums_Mutation_Response>>>;
  /** update data of the table: "start_exhibition_records" */
  update_start_exhibition_records?: Maybe<Start_Exhibition_Records_Mutation_Response>;
  /** update single row of the table: "start_exhibition_records" */
  update_start_exhibition_records_by_pk?: Maybe<Start_Exhibition_Records>;
  /** update multiples rows of table: "start_exhibition_records" */
  update_start_exhibition_records_many?: Maybe<
    Array<Maybe<Start_Exhibition_Records_Mutation_Response>>
  >;
  /** update data of the table: "weather_conditions" */
  update_weather_conditions?: Maybe<Weather_Conditions_Mutation_Response>;
  /** update single row of the table: "weather_conditions" */
  update_weather_conditions_by_pk?: Maybe<Weather_Conditions>;
  /** update multiples rows of table: "weather_conditions" */
  update_weather_conditions_many?: Maybe<
    Array<Maybe<Weather_Conditions_Mutation_Response>>
  >;
  /** update data of the table: "winning_race_entries" */
  update_winning_race_entries?: Maybe<Winning_Race_Entries_Mutation_Response>;
  /** update single row of the table: "winning_race_entries" */
  update_winning_race_entries_by_pk?: Maybe<Winning_Race_Entries>;
  /** update multiples rows of table: "winning_race_entries" */
  update_winning_race_entries_many?: Maybe<
    Array<Maybe<Winning_Race_Entries_Mutation_Response>>
  >;
};

/** mutation root */
export type Mutation_RootDelete_Boat_Betting_Contribute_Rate_AggregationsArgs =
  {
    where: Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp;
  };

/** mutation root */
export type Mutation_RootDelete_Boat_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    aggregated_on: Scalars['date']['input'];
    boat_number: Scalars['Int']['input'];
    stadium_tel_code: Scalars['Int']['input'];
  };

/** mutation root */
export type Mutation_RootDelete_Boat_SettingsArgs = {
  where: Boat_Settings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Boat_Settings_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Circumference_Exhibition_RecordsArgs = {
  where: Circumference_Exhibition_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Circumference_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Disqualified_Race_EntriesArgs = {
  where: Disqualified_Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Disqualified_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  stadium_tel_code: Scalars['Int']['input'];
  starts_on: Scalars['date']['input'];
  title: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Motor_Betting_Contribute_Rate_AggregationsArgs =
  {
    where: Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp;
  };

/** mutation root */
export type Mutation_RootDelete_Motor_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    aggregated_on: Scalars['date']['input'];
    motor_number: Scalars['Int']['input'];
    stadium_tel_code: Scalars['Int']['input'];
  };

/** mutation root */
export type Mutation_RootDelete_Motor_MaintenancesArgs = {
  where: Motor_Maintenances_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Motor_Maintenances_By_PkArgs = {
  date: Scalars['date']['input'];
  exchanged_parts: Scalars['Int']['input'];
  motor_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Motor_RenewalsArgs = {
  where: Motor_Renewals_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Motor_Renewals_By_PkArgs = {
  date: Scalars['date']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_OddsArgs = {
  where: Odds_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Odds_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_PayoffsArgs = {
  where: Payoffs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Payoffs_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_EntriesArgs = {
  where: Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_RecordsArgs = {
  where: Race_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Racer_ConditionsArgs = {
  where: Racer_Conditions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Racer_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Racer_Winning_Rate_AggregationsArgs = {
  where: Racer_Winning_Rate_Aggregations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Racer_Winning_Rate_Aggregations_By_PkArgs = {
  aggregated_on: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_RacersArgs = {
  where: Racers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Racers_By_PkArgs = {
  registration_number: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_RacesArgs = {
  where: Races_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Races_By_PkArgs = {
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_StadiumsArgs = {
  where: Stadiums_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Stadiums_By_PkArgs = {
  tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Start_Exhibition_RecordsArgs = {
  where: Start_Exhibition_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Start_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Weather_ConditionsArgs = {
  where: Weather_Conditions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Weather_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  is_in_performance: Scalars['Boolean']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Winning_Race_EntriesArgs = {
  where: Winning_Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Winning_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootInsert_Boat_Betting_Contribute_Rate_AggregationsArgs =
  {
    objects: Array<Boat_Betting_Contribute_Rate_Aggregations_Insert_Input>;
    on_conflict?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_On_Conflict>;
  };

/** mutation root */
export type Mutation_RootInsert_Boat_Betting_Contribute_Rate_Aggregations_OneArgs =
  {
    object: Boat_Betting_Contribute_Rate_Aggregations_Insert_Input;
    on_conflict?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_On_Conflict>;
  };

/** mutation root */
export type Mutation_RootInsert_Boat_SettingsArgs = {
  objects: Array<Boat_Settings_Insert_Input>;
  on_conflict?: InputMaybe<Boat_Settings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Boat_Settings_OneArgs = {
  object: Boat_Settings_Insert_Input;
  on_conflict?: InputMaybe<Boat_Settings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Circumference_Exhibition_RecordsArgs = {
  objects: Array<Circumference_Exhibition_Records_Insert_Input>;
  on_conflict?: InputMaybe<Circumference_Exhibition_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Circumference_Exhibition_Records_OneArgs = {
  object: Circumference_Exhibition_Records_Insert_Input;
  on_conflict?: InputMaybe<Circumference_Exhibition_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Disqualified_Race_EntriesArgs = {
  objects: Array<Disqualified_Race_Entries_Insert_Input>;
  on_conflict?: InputMaybe<Disqualified_Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Disqualified_Race_Entries_OneArgs = {
  object: Disqualified_Race_Entries_Insert_Input;
  on_conflict?: InputMaybe<Disqualified_Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Motor_Betting_Contribute_Rate_AggregationsArgs =
  {
    objects: Array<Motor_Betting_Contribute_Rate_Aggregations_Insert_Input>;
    on_conflict?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_On_Conflict>;
  };

/** mutation root */
export type Mutation_RootInsert_Motor_Betting_Contribute_Rate_Aggregations_OneArgs =
  {
    object: Motor_Betting_Contribute_Rate_Aggregations_Insert_Input;
    on_conflict?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_On_Conflict>;
  };

/** mutation root */
export type Mutation_RootInsert_Motor_MaintenancesArgs = {
  objects: Array<Motor_Maintenances_Insert_Input>;
  on_conflict?: InputMaybe<Motor_Maintenances_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Motor_Maintenances_OneArgs = {
  object: Motor_Maintenances_Insert_Input;
  on_conflict?: InputMaybe<Motor_Maintenances_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Motor_RenewalsArgs = {
  objects: Array<Motor_Renewals_Insert_Input>;
  on_conflict?: InputMaybe<Motor_Renewals_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Motor_Renewals_OneArgs = {
  object: Motor_Renewals_Insert_Input;
  on_conflict?: InputMaybe<Motor_Renewals_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_OddsArgs = {
  objects: Array<Odds_Insert_Input>;
  on_conflict?: InputMaybe<Odds_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Odds_OneArgs = {
  object: Odds_Insert_Input;
  on_conflict?: InputMaybe<Odds_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PayoffsArgs = {
  objects: Array<Payoffs_Insert_Input>;
  on_conflict?: InputMaybe<Payoffs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Payoffs_OneArgs = {
  object: Payoffs_Insert_Input;
  on_conflict?: InputMaybe<Payoffs_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_EntriesArgs = {
  objects: Array<Race_Entries_Insert_Input>;
  on_conflict?: InputMaybe<Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Entries_OneArgs = {
  object: Race_Entries_Insert_Input;
  on_conflict?: InputMaybe<Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_RecordsArgs = {
  objects: Array<Race_Records_Insert_Input>;
  on_conflict?: InputMaybe<Race_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Records_OneArgs = {
  object: Race_Records_Insert_Input;
  on_conflict?: InputMaybe<Race_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Racer_ConditionsArgs = {
  objects: Array<Racer_Conditions_Insert_Input>;
  on_conflict?: InputMaybe<Racer_Conditions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Racer_Conditions_OneArgs = {
  object: Racer_Conditions_Insert_Input;
  on_conflict?: InputMaybe<Racer_Conditions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Racer_Winning_Rate_AggregationsArgs = {
  objects: Array<Racer_Winning_Rate_Aggregations_Insert_Input>;
  on_conflict?: InputMaybe<Racer_Winning_Rate_Aggregations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Racer_Winning_Rate_Aggregations_OneArgs = {
  object: Racer_Winning_Rate_Aggregations_Insert_Input;
  on_conflict?: InputMaybe<Racer_Winning_Rate_Aggregations_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_RacersArgs = {
  objects: Array<Racers_Insert_Input>;
  on_conflict?: InputMaybe<Racers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Racers_OneArgs = {
  object: Racers_Insert_Input;
  on_conflict?: InputMaybe<Racers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_RacesArgs = {
  objects: Array<Races_Insert_Input>;
  on_conflict?: InputMaybe<Races_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Races_OneArgs = {
  object: Races_Insert_Input;
  on_conflict?: InputMaybe<Races_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_StadiumsArgs = {
  objects: Array<Stadiums_Insert_Input>;
  on_conflict?: InputMaybe<Stadiums_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Stadiums_OneArgs = {
  object: Stadiums_Insert_Input;
  on_conflict?: InputMaybe<Stadiums_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Start_Exhibition_RecordsArgs = {
  objects: Array<Start_Exhibition_Records_Insert_Input>;
  on_conflict?: InputMaybe<Start_Exhibition_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Start_Exhibition_Records_OneArgs = {
  object: Start_Exhibition_Records_Insert_Input;
  on_conflict?: InputMaybe<Start_Exhibition_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_ConditionsArgs = {
  objects: Array<Weather_Conditions_Insert_Input>;
  on_conflict?: InputMaybe<Weather_Conditions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_Conditions_OneArgs = {
  object: Weather_Conditions_Insert_Input;
  on_conflict?: InputMaybe<Weather_Conditions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Winning_Race_EntriesArgs = {
  objects: Array<Winning_Race_Entries_Insert_Input>;
  on_conflict?: InputMaybe<Winning_Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Winning_Race_Entries_OneArgs = {
  object: Winning_Race_Entries_Insert_Input;
  on_conflict?: InputMaybe<Winning_Race_Entries_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_Boat_Betting_Contribute_Rate_AggregationsArgs =
  {
    _inc?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Inc_Input>;
    _set?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Set_Input>;
    where: Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp;
  };

/** mutation root */
export type Mutation_RootUpdate_Boat_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    _inc?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Inc_Input>;
    _set?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Set_Input>;
    pk_columns: Boat_Betting_Contribute_Rate_Aggregations_Pk_Columns_Input;
  };

/** mutation root */
export type Mutation_RootUpdate_Boat_Betting_Contribute_Rate_Aggregations_ManyArgs =
  {
    updates: Array<Boat_Betting_Contribute_Rate_Aggregations_Updates>;
  };

/** mutation root */
export type Mutation_RootUpdate_Boat_SettingsArgs = {
  _inc?: InputMaybe<Boat_Settings_Inc_Input>;
  _set?: InputMaybe<Boat_Settings_Set_Input>;
  where: Boat_Settings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Boat_Settings_By_PkArgs = {
  _inc?: InputMaybe<Boat_Settings_Inc_Input>;
  _set?: InputMaybe<Boat_Settings_Set_Input>;
  pk_columns: Boat_Settings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Boat_Settings_ManyArgs = {
  updates: Array<Boat_Settings_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Circumference_Exhibition_RecordsArgs = {
  _inc?: InputMaybe<Circumference_Exhibition_Records_Inc_Input>;
  _set?: InputMaybe<Circumference_Exhibition_Records_Set_Input>;
  where: Circumference_Exhibition_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Circumference_Exhibition_Records_By_PkArgs = {
  _inc?: InputMaybe<Circumference_Exhibition_Records_Inc_Input>;
  _set?: InputMaybe<Circumference_Exhibition_Records_Set_Input>;
  pk_columns: Circumference_Exhibition_Records_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Circumference_Exhibition_Records_ManyArgs = {
  updates: Array<Circumference_Exhibition_Records_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Disqualified_Race_EntriesArgs = {
  _inc?: InputMaybe<Disqualified_Race_Entries_Inc_Input>;
  _set?: InputMaybe<Disqualified_Race_Entries_Set_Input>;
  where: Disqualified_Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Disqualified_Race_Entries_By_PkArgs = {
  _inc?: InputMaybe<Disqualified_Race_Entries_Inc_Input>;
  _set?: InputMaybe<Disqualified_Race_Entries_Set_Input>;
  pk_columns: Disqualified_Race_Entries_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Disqualified_Race_Entries_ManyArgs = {
  updates: Array<Disqualified_Race_Entries_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Array<Events_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_Betting_Contribute_Rate_AggregationsArgs =
  {
    _inc?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Inc_Input>;
    _set?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Set_Input>;
    where: Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp;
  };

/** mutation root */
export type Mutation_RootUpdate_Motor_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    _inc?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Inc_Input>;
    _set?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Set_Input>;
    pk_columns: Motor_Betting_Contribute_Rate_Aggregations_Pk_Columns_Input;
  };

/** mutation root */
export type Mutation_RootUpdate_Motor_Betting_Contribute_Rate_Aggregations_ManyArgs =
  {
    updates: Array<Motor_Betting_Contribute_Rate_Aggregations_Updates>;
  };

/** mutation root */
export type Mutation_RootUpdate_Motor_MaintenancesArgs = {
  _inc?: InputMaybe<Motor_Maintenances_Inc_Input>;
  _set?: InputMaybe<Motor_Maintenances_Set_Input>;
  where: Motor_Maintenances_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_Maintenances_By_PkArgs = {
  _inc?: InputMaybe<Motor_Maintenances_Inc_Input>;
  _set?: InputMaybe<Motor_Maintenances_Set_Input>;
  pk_columns: Motor_Maintenances_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_Maintenances_ManyArgs = {
  updates: Array<Motor_Maintenances_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_RenewalsArgs = {
  _inc?: InputMaybe<Motor_Renewals_Inc_Input>;
  _set?: InputMaybe<Motor_Renewals_Set_Input>;
  where: Motor_Renewals_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_Renewals_By_PkArgs = {
  _inc?: InputMaybe<Motor_Renewals_Inc_Input>;
  _set?: InputMaybe<Motor_Renewals_Set_Input>;
  pk_columns: Motor_Renewals_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Motor_Renewals_ManyArgs = {
  updates: Array<Motor_Renewals_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_OddsArgs = {
  _inc?: InputMaybe<Odds_Inc_Input>;
  _set?: InputMaybe<Odds_Set_Input>;
  where: Odds_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Odds_By_PkArgs = {
  _inc?: InputMaybe<Odds_Inc_Input>;
  _set?: InputMaybe<Odds_Set_Input>;
  pk_columns: Odds_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Odds_ManyArgs = {
  updates: Array<Odds_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_PayoffsArgs = {
  _inc?: InputMaybe<Payoffs_Inc_Input>;
  _set?: InputMaybe<Payoffs_Set_Input>;
  where: Payoffs_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Payoffs_By_PkArgs = {
  _inc?: InputMaybe<Payoffs_Inc_Input>;
  _set?: InputMaybe<Payoffs_Set_Input>;
  pk_columns: Payoffs_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Payoffs_ManyArgs = {
  updates: Array<Payoffs_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_EntriesArgs = {
  _inc?: InputMaybe<Race_Entries_Inc_Input>;
  _set?: InputMaybe<Race_Entries_Set_Input>;
  where: Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Entries_By_PkArgs = {
  _inc?: InputMaybe<Race_Entries_Inc_Input>;
  _set?: InputMaybe<Race_Entries_Set_Input>;
  pk_columns: Race_Entries_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Entries_ManyArgs = {
  updates: Array<Race_Entries_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_RecordsArgs = {
  _inc?: InputMaybe<Race_Records_Inc_Input>;
  _set?: InputMaybe<Race_Records_Set_Input>;
  where: Race_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Records_By_PkArgs = {
  _inc?: InputMaybe<Race_Records_Inc_Input>;
  _set?: InputMaybe<Race_Records_Set_Input>;
  pk_columns: Race_Records_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Records_ManyArgs = {
  updates: Array<Race_Records_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_ConditionsArgs = {
  _inc?: InputMaybe<Racer_Conditions_Inc_Input>;
  _set?: InputMaybe<Racer_Conditions_Set_Input>;
  where: Racer_Conditions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_Conditions_By_PkArgs = {
  _inc?: InputMaybe<Racer_Conditions_Inc_Input>;
  _set?: InputMaybe<Racer_Conditions_Set_Input>;
  pk_columns: Racer_Conditions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_Conditions_ManyArgs = {
  updates: Array<Racer_Conditions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_Winning_Rate_AggregationsArgs = {
  _inc?: InputMaybe<Racer_Winning_Rate_Aggregations_Inc_Input>;
  _set?: InputMaybe<Racer_Winning_Rate_Aggregations_Set_Input>;
  where: Racer_Winning_Rate_Aggregations_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_Winning_Rate_Aggregations_By_PkArgs = {
  _inc?: InputMaybe<Racer_Winning_Rate_Aggregations_Inc_Input>;
  _set?: InputMaybe<Racer_Winning_Rate_Aggregations_Set_Input>;
  pk_columns: Racer_Winning_Rate_Aggregations_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Racer_Winning_Rate_Aggregations_ManyArgs = {
  updates: Array<Racer_Winning_Rate_Aggregations_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_RacersArgs = {
  _inc?: InputMaybe<Racers_Inc_Input>;
  _set?: InputMaybe<Racers_Set_Input>;
  where: Racers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Racers_By_PkArgs = {
  _inc?: InputMaybe<Racers_Inc_Input>;
  _set?: InputMaybe<Racers_Set_Input>;
  pk_columns: Racers_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Racers_ManyArgs = {
  updates: Array<Racers_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_RacesArgs = {
  _inc?: InputMaybe<Races_Inc_Input>;
  _set?: InputMaybe<Races_Set_Input>;
  where: Races_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Races_By_PkArgs = {
  _inc?: InputMaybe<Races_Inc_Input>;
  _set?: InputMaybe<Races_Set_Input>;
  pk_columns: Races_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Races_ManyArgs = {
  updates: Array<Races_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_StadiumsArgs = {
  _inc?: InputMaybe<Stadiums_Inc_Input>;
  _set?: InputMaybe<Stadiums_Set_Input>;
  where: Stadiums_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Stadiums_By_PkArgs = {
  _inc?: InputMaybe<Stadiums_Inc_Input>;
  _set?: InputMaybe<Stadiums_Set_Input>;
  pk_columns: Stadiums_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Stadiums_ManyArgs = {
  updates: Array<Stadiums_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Start_Exhibition_RecordsArgs = {
  _inc?: InputMaybe<Start_Exhibition_Records_Inc_Input>;
  _set?: InputMaybe<Start_Exhibition_Records_Set_Input>;
  where: Start_Exhibition_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Start_Exhibition_Records_By_PkArgs = {
  _inc?: InputMaybe<Start_Exhibition_Records_Inc_Input>;
  _set?: InputMaybe<Start_Exhibition_Records_Set_Input>;
  pk_columns: Start_Exhibition_Records_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Start_Exhibition_Records_ManyArgs = {
  updates: Array<Start_Exhibition_Records_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_ConditionsArgs = {
  _inc?: InputMaybe<Weather_Conditions_Inc_Input>;
  _set?: InputMaybe<Weather_Conditions_Set_Input>;
  where: Weather_Conditions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Conditions_By_PkArgs = {
  _inc?: InputMaybe<Weather_Conditions_Inc_Input>;
  _set?: InputMaybe<Weather_Conditions_Set_Input>;
  pk_columns: Weather_Conditions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Conditions_ManyArgs = {
  updates: Array<Weather_Conditions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Winning_Race_EntriesArgs = {
  _inc?: InputMaybe<Winning_Race_Entries_Inc_Input>;
  _set?: InputMaybe<Winning_Race_Entries_Set_Input>;
  where: Winning_Race_Entries_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Winning_Race_Entries_By_PkArgs = {
  _inc?: InputMaybe<Winning_Race_Entries_Inc_Input>;
  _set?: InputMaybe<Winning_Race_Entries_Set_Input>;
  pk_columns: Winning_Race_Entries_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Winning_Race_Entries_ManyArgs = {
  updates: Array<Winning_Race_Entries_Updates>;
};

/** columns and relationships of "odds" */
export type Odds = {
  __typename?: 'odds';
  betting_method: Scalars['Int']['output'];
  betting_number: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  race_number: Scalars['Int']['output'];
  ratio: Scalars['float8']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "odds" */
export type Odds_Aggregate = {
  __typename?: 'odds_aggregate';
  aggregate?: Maybe<Odds_Aggregate_Fields>;
  nodes: Array<Odds>;
};

/** aggregate fields of "odds" */
export type Odds_Aggregate_Fields = {
  __typename?: 'odds_aggregate_fields';
  avg?: Maybe<Odds_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Odds_Max_Fields>;
  min?: Maybe<Odds_Min_Fields>;
  stddev?: Maybe<Odds_Stddev_Fields>;
  stddev_pop?: Maybe<Odds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Odds_Stddev_Samp_Fields>;
  sum?: Maybe<Odds_Sum_Fields>;
  var_pop?: Maybe<Odds_Var_Pop_Fields>;
  var_samp?: Maybe<Odds_Var_Samp_Fields>;
  variance?: Maybe<Odds_Variance_Fields>;
};

/** aggregate fields of "odds" */
export type Odds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Odds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Odds_Avg_Fields = {
  __typename?: 'odds_avg_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "odds". All fields are combined with a logical 'AND'. */
export type Odds_Bool_Exp = {
  _and?: InputMaybe<Array<Odds_Bool_Exp>>;
  _not?: InputMaybe<Odds_Bool_Exp>;
  _or?: InputMaybe<Array<Odds_Bool_Exp>>;
  betting_method?: InputMaybe<Int_Comparison_Exp>;
  betting_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  ratio?: InputMaybe<Float8_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "odds" */
export enum Odds_Constraint {
  /** unique or primary key constraint on columns "betting_number", "stadium_tel_code", "date", "race_number", "betting_method" */
  OddsPkey = 'odds_pkey',
}

/** input type for incrementing numeric columns in table "odds" */
export type Odds_Inc_Input = {
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "odds" */
export type Odds_Insert_Input = {
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Odds_Max_Fields = {
  __typename?: 'odds_max_fields';
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  ratio?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Odds_Min_Fields = {
  __typename?: 'odds_min_fields';
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  ratio?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "odds" */
export type Odds_Mutation_Response = {
  __typename?: 'odds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Odds>;
};

/** on_conflict condition type for table "odds" */
export type Odds_On_Conflict = {
  constraint: Odds_Constraint;
  update_columns?: Array<Odds_Update_Column>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

/** Ordering options when selecting data from "odds". */
export type Odds_Order_By = {
  betting_method?: InputMaybe<Order_By>;
  betting_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  ratio?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: odds */
export type Odds_Pk_Columns_Input = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "odds" */
export enum Odds_Select_Column {
  /** column name */
  BettingMethod = 'betting_method',
  /** column name */
  BettingNumber = 'betting_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  Ratio = 'ratio',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "odds" */
export type Odds_Set_Input = {
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Odds_Stddev_Fields = {
  __typename?: 'odds_stddev_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Odds_Stddev_Pop_Fields = {
  __typename?: 'odds_stddev_pop_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Odds_Stddev_Samp_Fields = {
  __typename?: 'odds_stddev_samp_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "odds" */
export type Odds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Odds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Odds_Stream_Cursor_Value_Input = {
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Odds_Sum_Fields = {
  __typename?: 'odds_sum_fields';
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  ratio?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "odds" */
export enum Odds_Update_Column {
  /** column name */
  BettingMethod = 'betting_method',
  /** column name */
  BettingNumber = 'betting_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  Ratio = 'ratio',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Odds_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Odds_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Odds_Set_Input>;
  /** filter the rows which have to be updated */
  where: Odds_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Odds_Var_Pop_Fields = {
  __typename?: 'odds_var_pop_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Odds_Var_Samp_Fields = {
  __typename?: 'odds_var_samp_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Odds_Variance_Fields = {
  __typename?: 'odds_variance_fields';
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  ratio?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "payoffs" */
export type Payoffs = {
  __typename?: 'payoffs';
  amount: Scalars['Int']['output'];
  betting_method: Scalars['Int']['output'];
  betting_number: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "payoffs" */
export type Payoffs_Aggregate = {
  __typename?: 'payoffs_aggregate';
  aggregate?: Maybe<Payoffs_Aggregate_Fields>;
  nodes: Array<Payoffs>;
};

/** aggregate fields of "payoffs" */
export type Payoffs_Aggregate_Fields = {
  __typename?: 'payoffs_aggregate_fields';
  avg?: Maybe<Payoffs_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Payoffs_Max_Fields>;
  min?: Maybe<Payoffs_Min_Fields>;
  stddev?: Maybe<Payoffs_Stddev_Fields>;
  stddev_pop?: Maybe<Payoffs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payoffs_Stddev_Samp_Fields>;
  sum?: Maybe<Payoffs_Sum_Fields>;
  var_pop?: Maybe<Payoffs_Var_Pop_Fields>;
  var_samp?: Maybe<Payoffs_Var_Samp_Fields>;
  variance?: Maybe<Payoffs_Variance_Fields>;
};

/** aggregate fields of "payoffs" */
export type Payoffs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Payoffs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Payoffs_Avg_Fields = {
  __typename?: 'payoffs_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "payoffs". All fields are combined with a logical 'AND'. */
export type Payoffs_Bool_Exp = {
  _and?: InputMaybe<Array<Payoffs_Bool_Exp>>;
  _not?: InputMaybe<Payoffs_Bool_Exp>;
  _or?: InputMaybe<Array<Payoffs_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  betting_method?: InputMaybe<Int_Comparison_Exp>;
  betting_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "payoffs" */
export enum Payoffs_Constraint {
  /** unique or primary key constraint on columns "betting_number", "stadium_tel_code", "date", "race_number", "betting_method" */
  PayoffsPkey = 'payoffs_pkey',
}

/** input type for incrementing numeric columns in table "payoffs" */
export type Payoffs_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "payoffs" */
export type Payoffs_Insert_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Payoffs_Max_Fields = {
  __typename?: 'payoffs_max_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Payoffs_Min_Fields = {
  __typename?: 'payoffs_min_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "payoffs" */
export type Payoffs_Mutation_Response = {
  __typename?: 'payoffs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Payoffs>;
};

/** on_conflict condition type for table "payoffs" */
export type Payoffs_On_Conflict = {
  constraint: Payoffs_Constraint;
  update_columns?: Array<Payoffs_Update_Column>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

/** Ordering options when selecting data from "payoffs". */
export type Payoffs_Order_By = {
  amount?: InputMaybe<Order_By>;
  betting_method?: InputMaybe<Order_By>;
  betting_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: payoffs */
export type Payoffs_Pk_Columns_Input = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "payoffs" */
export enum Payoffs_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BettingMethod = 'betting_method',
  /** column name */
  BettingNumber = 'betting_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "payoffs" */
export type Payoffs_Set_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Payoffs_Stddev_Fields = {
  __typename?: 'payoffs_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Payoffs_Stddev_Pop_Fields = {
  __typename?: 'payoffs_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Payoffs_Stddev_Samp_Fields = {
  __typename?: 'payoffs_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "payoffs" */
export type Payoffs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Payoffs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Payoffs_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  betting_method?: InputMaybe<Scalars['Int']['input']>;
  betting_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Payoffs_Sum_Fields = {
  __typename?: 'payoffs_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  betting_method?: Maybe<Scalars['Int']['output']>;
  betting_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "payoffs" */
export enum Payoffs_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BettingMethod = 'betting_method',
  /** column name */
  BettingNumber = 'betting_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Payoffs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Payoffs_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Payoffs_Set_Input>;
  /** filter the rows which have to be updated */
  where: Payoffs_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Payoffs_Var_Pop_Fields = {
  __typename?: 'payoffs_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Payoffs_Var_Samp_Fields = {
  __typename?: 'payoffs_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Payoffs_Variance_Fields = {
  __typename?: 'payoffs_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  betting_method?: Maybe<Scalars['Float']['output']>;
  betting_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "boat_betting_contribute_rate_aggregations" */
  boat_betting_contribute_rate_aggregations: Array<Boat_Betting_Contribute_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "boat_betting_contribute_rate_aggregations" */
  boat_betting_contribute_rate_aggregations_aggregate: Boat_Betting_Contribute_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "boat_betting_contribute_rate_aggregations" using primary key columns */
  boat_betting_contribute_rate_aggregations_by_pk?: Maybe<Boat_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table: "boat_settings" */
  boat_settings: Array<Boat_Settings>;
  /** fetch aggregated fields from the table: "boat_settings" */
  boat_settings_aggregate: Boat_Settings_Aggregate;
  /** fetch data from the table: "boat_settings" using primary key columns */
  boat_settings_by_pk?: Maybe<Boat_Settings>;
  /** fetch data from the table: "circumference_exhibition_records" */
  circumference_exhibition_records: Array<Circumference_Exhibition_Records>;
  /** fetch aggregated fields from the table: "circumference_exhibition_records" */
  circumference_exhibition_records_aggregate: Circumference_Exhibition_Records_Aggregate;
  /** fetch data from the table: "circumference_exhibition_records" using primary key columns */
  circumference_exhibition_records_by_pk?: Maybe<Circumference_Exhibition_Records>;
  /** fetch data from the table: "disqualified_race_entries" */
  disqualified_race_entries: Array<Disqualified_Race_Entries>;
  /** fetch aggregated fields from the table: "disqualified_race_entries" */
  disqualified_race_entries_aggregate: Disqualified_Race_Entries_Aggregate;
  /** fetch data from the table: "disqualified_race_entries" using primary key columns */
  disqualified_race_entries_by_pk?: Maybe<Disqualified_Race_Entries>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "motor_betting_contribute_rate_aggregations" */
  motor_betting_contribute_rate_aggregations: Array<Motor_Betting_Contribute_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "motor_betting_contribute_rate_aggregations" */
  motor_betting_contribute_rate_aggregations_aggregate: Motor_Betting_Contribute_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "motor_betting_contribute_rate_aggregations" using primary key columns */
  motor_betting_contribute_rate_aggregations_by_pk?: Maybe<Motor_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table: "motor_maintenances" */
  motor_maintenances: Array<Motor_Maintenances>;
  /** fetch aggregated fields from the table: "motor_maintenances" */
  motor_maintenances_aggregate: Motor_Maintenances_Aggregate;
  /** fetch data from the table: "motor_maintenances" using primary key columns */
  motor_maintenances_by_pk?: Maybe<Motor_Maintenances>;
  /** fetch data from the table: "motor_renewals" */
  motor_renewals: Array<Motor_Renewals>;
  /** fetch aggregated fields from the table: "motor_renewals" */
  motor_renewals_aggregate: Motor_Renewals_Aggregate;
  /** fetch data from the table: "motor_renewals" using primary key columns */
  motor_renewals_by_pk?: Maybe<Motor_Renewals>;
  /** fetch data from the table: "odds" */
  odds: Array<Odds>;
  /** fetch aggregated fields from the table: "odds" */
  odds_aggregate: Odds_Aggregate;
  /** fetch data from the table: "odds" using primary key columns */
  odds_by_pk?: Maybe<Odds>;
  /** fetch data from the table: "payoffs" */
  payoffs: Array<Payoffs>;
  /** fetch aggregated fields from the table: "payoffs" */
  payoffs_aggregate: Payoffs_Aggregate;
  /** fetch data from the table: "payoffs" using primary key columns */
  payoffs_by_pk?: Maybe<Payoffs>;
  /** fetch data from the table: "race_entries" */
  race_entries: Array<Race_Entries>;
  /** fetch aggregated fields from the table: "race_entries" */
  race_entries_aggregate: Race_Entries_Aggregate;
  /** fetch data from the table: "race_entries" using primary key columns */
  race_entries_by_pk?: Maybe<Race_Entries>;
  /** fetch data from the table: "race_records" */
  race_records: Array<Race_Records>;
  /** fetch aggregated fields from the table: "race_records" */
  race_records_aggregate: Race_Records_Aggregate;
  /** fetch data from the table: "race_records" using primary key columns */
  race_records_by_pk?: Maybe<Race_Records>;
  /** fetch data from the table: "racer_conditions" */
  racer_conditions: Array<Racer_Conditions>;
  /** fetch aggregated fields from the table: "racer_conditions" */
  racer_conditions_aggregate: Racer_Conditions_Aggregate;
  /** fetch data from the table: "racer_conditions" using primary key columns */
  racer_conditions_by_pk?: Maybe<Racer_Conditions>;
  /** fetch data from the table: "racer_winning_rate_aggregations" */
  racer_winning_rate_aggregations: Array<Racer_Winning_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "racer_winning_rate_aggregations" */
  racer_winning_rate_aggregations_aggregate: Racer_Winning_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "racer_winning_rate_aggregations" using primary key columns */
  racer_winning_rate_aggregations_by_pk?: Maybe<Racer_Winning_Rate_Aggregations>;
  /** fetch data from the table: "racers" */
  racers: Array<Racers>;
  /** fetch aggregated fields from the table: "racers" */
  racers_aggregate: Racers_Aggregate;
  /** fetch data from the table: "racers" using primary key columns */
  racers_by_pk?: Maybe<Racers>;
  /** fetch data from the table: "races" */
  races: Array<Races>;
  /** fetch aggregated fields from the table: "races" */
  races_aggregate: Races_Aggregate;
  /** fetch data from the table: "races" using primary key columns */
  races_by_pk?: Maybe<Races>;
  /** fetch data from the table: "stadiums" */
  stadiums: Array<Stadiums>;
  /** fetch aggregated fields from the table: "stadiums" */
  stadiums_aggregate: Stadiums_Aggregate;
  /** fetch data from the table: "stadiums" using primary key columns */
  stadiums_by_pk?: Maybe<Stadiums>;
  /** fetch data from the table: "start_exhibition_records" */
  start_exhibition_records: Array<Start_Exhibition_Records>;
  /** fetch aggregated fields from the table: "start_exhibition_records" */
  start_exhibition_records_aggregate: Start_Exhibition_Records_Aggregate;
  /** fetch data from the table: "start_exhibition_records" using primary key columns */
  start_exhibition_records_by_pk?: Maybe<Start_Exhibition_Records>;
  /** fetch data from the table: "weather_conditions" */
  weather_conditions: Array<Weather_Conditions>;
  /** fetch aggregated fields from the table: "weather_conditions" */
  weather_conditions_aggregate: Weather_Conditions_Aggregate;
  /** fetch data from the table: "weather_conditions" using primary key columns */
  weather_conditions_by_pk?: Maybe<Weather_Conditions>;
  /** fetch data from the table: "winning_race_entries" */
  winning_race_entries: Array<Winning_Race_Entries>;
  /** fetch aggregated fields from the table: "winning_race_entries" */
  winning_race_entries_aggregate: Winning_Race_Entries_Aggregate;
  /** fetch data from the table: "winning_race_entries" using primary key columns */
  winning_race_entries_by_pk?: Maybe<Winning_Race_Entries>;
};

export type Query_RootBoat_Betting_Contribute_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Boat_Betting_Contribute_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<
    Array<Boat_Betting_Contribute_Rate_Aggregations_Order_By>
  >;
  where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

export type Query_RootBoat_Betting_Contribute_Rate_Aggregations_AggregateArgs =
  {
    distinct_on?: InputMaybe<
      Array<Boat_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<
      Array<Boat_Betting_Contribute_Rate_Aggregations_Order_By>
    >;
    where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Query_RootBoat_Betting_Contribute_Rate_Aggregations_By_PkArgs = {
  aggregated_on: Scalars['date']['input'];
  boat_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootBoat_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Boat_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Boat_Settings_Order_By>>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

export type Query_RootBoat_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Boat_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Boat_Settings_Order_By>>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

export type Query_RootBoat_Settings_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootCircumference_Exhibition_RecordsArgs = {
  distinct_on?: InputMaybe<
    Array<Circumference_Exhibition_Records_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circumference_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

export type Query_RootCircumference_Exhibition_Records_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Circumference_Exhibition_Records_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circumference_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

export type Query_RootCircumference_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootDisqualified_Race_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Disqualified_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Disqualified_Race_Entries_Order_By>>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

export type Query_RootDisqualified_Race_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Disqualified_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Disqualified_Race_Entries_Order_By>>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

export type Query_RootDisqualified_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_By_PkArgs = {
  stadium_tel_code: Scalars['Int']['input'];
  starts_on: Scalars['date']['input'];
  title: Scalars['String']['input'];
};

export type Query_RootMotor_Betting_Contribute_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Motor_Betting_Contribute_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<
    Array<Motor_Betting_Contribute_Rate_Aggregations_Order_By>
  >;
  where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

export type Query_RootMotor_Betting_Contribute_Rate_Aggregations_AggregateArgs =
  {
    distinct_on?: InputMaybe<
      Array<Motor_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<
      Array<Motor_Betting_Contribute_Rate_Aggregations_Order_By>
    >;
    where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Query_RootMotor_Betting_Contribute_Rate_Aggregations_By_PkArgs = {
  aggregated_on: Scalars['date']['input'];
  motor_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootMotor_MaintenancesArgs = {
  distinct_on?: InputMaybe<Array<Motor_Maintenances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Maintenances_Order_By>>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

export type Query_RootMotor_Maintenances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motor_Maintenances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Maintenances_Order_By>>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

export type Query_RootMotor_Maintenances_By_PkArgs = {
  date: Scalars['date']['input'];
  exchanged_parts: Scalars['Int']['input'];
  motor_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootMotor_RenewalsArgs = {
  distinct_on?: InputMaybe<Array<Motor_Renewals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Renewals_Order_By>>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

export type Query_RootMotor_Renewals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motor_Renewals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Renewals_Order_By>>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

export type Query_RootMotor_Renewals_By_PkArgs = {
  date: Scalars['date']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootOddsArgs = {
  distinct_on?: InputMaybe<Array<Odds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Odds_Order_By>>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

export type Query_RootOdds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Odds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Odds_Order_By>>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

export type Query_RootOdds_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootPayoffsArgs = {
  distinct_on?: InputMaybe<Array<Payoffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payoffs_Order_By>>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

export type Query_RootPayoffs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payoffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payoffs_Order_By>>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

export type Query_RootPayoffs_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootRace_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

export type Query_RootRace_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

export type Query_RootRace_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootRace_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Race_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Records_Order_By>>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

export type Query_RootRace_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Records_Order_By>>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

export type Query_RootRace_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootRacer_ConditionsArgs = {
  distinct_on?: InputMaybe<Array<Racer_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Conditions_Order_By>>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

export type Query_RootRacer_Conditions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Racer_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Conditions_Order_By>>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

export type Query_RootRacer_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

export type Query_RootRacer_Winning_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Racer_Winning_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Order_By>>;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

export type Query_RootRacer_Winning_Rate_Aggregations_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Racer_Winning_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Order_By>>;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

export type Query_RootRacer_Winning_Rate_Aggregations_By_PkArgs = {
  aggregated_on: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

export type Query_RootRacersArgs = {
  distinct_on?: InputMaybe<Array<Racers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racers_Order_By>>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

export type Query_RootRacers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Racers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racers_Order_By>>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

export type Query_RootRacers_By_PkArgs = {
  registration_number: Scalars['Int']['input'];
};

export type Query_RootRacesArgs = {
  distinct_on?: InputMaybe<Array<Races_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Races_Order_By>>;
  where?: InputMaybe<Races_Bool_Exp>;
};

export type Query_RootRaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Races_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Races_Order_By>>;
  where?: InputMaybe<Races_Bool_Exp>;
};

export type Query_RootRaces_By_PkArgs = {
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootStadiumsArgs = {
  distinct_on?: InputMaybe<Array<Stadiums_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stadiums_Order_By>>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

export type Query_RootStadiums_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stadiums_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stadiums_Order_By>>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

export type Query_RootStadiums_By_PkArgs = {
  tel_code: Scalars['Int']['input'];
};

export type Query_RootStart_Exhibition_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Start_Exhibition_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Start_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

export type Query_RootStart_Exhibition_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Start_Exhibition_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Start_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

export type Query_RootStart_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootWeather_ConditionsArgs = {
  distinct_on?: InputMaybe<Array<Weather_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Conditions_Order_By>>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

export type Query_RootWeather_Conditions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Conditions_Order_By>>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

export type Query_RootWeather_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  is_in_performance: Scalars['Boolean']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Query_RootWinning_Race_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Winning_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Winning_Race_Entries_Order_By>>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

export type Query_RootWinning_Race_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Winning_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Winning_Race_Entries_Order_By>>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

export type Query_RootWinning_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** columns and relationships of "race_entries" */
export type Race_Entries = {
  __typename?: 'race_entries';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  /** An object relationship */
  racer?: Maybe<Racers>;
  racer_registration_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "race_entries" */
export type Race_Entries_Aggregate = {
  __typename?: 'race_entries_aggregate';
  aggregate?: Maybe<Race_Entries_Aggregate_Fields>;
  nodes: Array<Race_Entries>;
};

export type Race_Entries_Aggregate_Bool_Exp = {
  count?: InputMaybe<Race_Entries_Aggregate_Bool_Exp_Count>;
};

export type Race_Entries_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Race_Entries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Race_Entries_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "race_entries" */
export type Race_Entries_Aggregate_Fields = {
  __typename?: 'race_entries_aggregate_fields';
  avg?: Maybe<Race_Entries_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Entries_Max_Fields>;
  min?: Maybe<Race_Entries_Min_Fields>;
  stddev?: Maybe<Race_Entries_Stddev_Fields>;
  stddev_pop?: Maybe<Race_Entries_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Race_Entries_Stddev_Samp_Fields>;
  sum?: Maybe<Race_Entries_Sum_Fields>;
  var_pop?: Maybe<Race_Entries_Var_Pop_Fields>;
  var_samp?: Maybe<Race_Entries_Var_Samp_Fields>;
  variance?: Maybe<Race_Entries_Variance_Fields>;
};

/** aggregate fields of "race_entries" */
export type Race_Entries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Entries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "race_entries" */
export type Race_Entries_Aggregate_Order_By = {
  avg?: InputMaybe<Race_Entries_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Race_Entries_Max_Order_By>;
  min?: InputMaybe<Race_Entries_Min_Order_By>;
  stddev?: InputMaybe<Race_Entries_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Race_Entries_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Race_Entries_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Race_Entries_Sum_Order_By>;
  var_pop?: InputMaybe<Race_Entries_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Race_Entries_Var_Samp_Order_By>;
  variance?: InputMaybe<Race_Entries_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "race_entries" */
export type Race_Entries_Arr_Rel_Insert_Input = {
  data: Array<Race_Entries_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Entries_On_Conflict>;
};

/** aggregate avg on columns */
export type Race_Entries_Avg_Fields = {
  __typename?: 'race_entries_avg_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "race_entries" */
export type Race_Entries_Avg_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "race_entries". All fields are combined with a logical 'AND'. */
export type Race_Entries_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Entries_Bool_Exp>>;
  _not?: InputMaybe<Race_Entries_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Entries_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  racer?: InputMaybe<Racers_Bool_Exp>;
  racer_registration_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "race_entries" */
export enum Race_Entries_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  RaceEntriesPkey = 'race_entries_pkey',
  /** unique or primary key constraint on columns "racer_registration_number", "stadium_tel_code", "date", "race_number" */
  UniqIndex_1 = 'uniq_index_1',
}

/** input type for incrementing numeric columns in table "race_entries" */
export type Race_Entries_Inc_Input = {
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "race_entries" */
export type Race_Entries_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  racer?: InputMaybe<Racers_Obj_Rel_Insert_Input>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Race_Entries_Max_Fields = {
  __typename?: 'race_entries_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "race_entries" */
export type Race_Entries_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Race_Entries_Min_Fields = {
  __typename?: 'race_entries_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "race_entries" */
export type Race_Entries_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "race_entries" */
export type Race_Entries_Mutation_Response = {
  __typename?: 'race_entries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Entries>;
};

/** on_conflict condition type for table "race_entries" */
export type Race_Entries_On_Conflict = {
  constraint: Race_Entries_Constraint;
  update_columns?: Array<Race_Entries_Update_Column>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

/** Ordering options when selecting data from "race_entries". */
export type Race_Entries_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer?: InputMaybe<Racers_Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_entries */
export type Race_Entries_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "race_entries" */
export enum Race_Entries_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "race_entries" */
export type Race_Entries_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Race_Entries_Stddev_Fields = {
  __typename?: 'race_entries_stddev_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "race_entries" */
export type Race_Entries_Stddev_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Race_Entries_Stddev_Pop_Fields = {
  __typename?: 'race_entries_stddev_pop_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "race_entries" */
export type Race_Entries_Stddev_Pop_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Race_Entries_Stddev_Samp_Fields = {
  __typename?: 'race_entries_stddev_samp_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "race_entries" */
export type Race_Entries_Stddev_Samp_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "race_entries" */
export type Race_Entries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Entries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Entries_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Race_Entries_Sum_Fields = {
  __typename?: 'race_entries_sum_fields';
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "race_entries" */
export type Race_Entries_Sum_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** update columns of table "race_entries" */
export enum Race_Entries_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Race_Entries_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Race_Entries_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Entries_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Entries_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Race_Entries_Var_Pop_Fields = {
  __typename?: 'race_entries_var_pop_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "race_entries" */
export type Race_Entries_Var_Pop_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Race_Entries_Var_Samp_Fields = {
  __typename?: 'race_entries_var_samp_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "race_entries" */
export type Race_Entries_Var_Samp_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Race_Entries_Variance_Fields = {
  __typename?: 'race_entries_variance_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "race_entries" */
export type Race_Entries_Variance_Order_By = {
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
};

/** columns and relationships of "race_records" */
export type Race_Records = {
  __typename?: 'race_records';
  arrival?: Maybe<Scalars['Int']['output']>;
  course_number: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  race_time?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code: Scalars['Int']['output'];
  start_time?: Maybe<Scalars['float8']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "race_records" */
export type Race_Records_Aggregate = {
  __typename?: 'race_records_aggregate';
  aggregate?: Maybe<Race_Records_Aggregate_Fields>;
  nodes: Array<Race_Records>;
};

/** aggregate fields of "race_records" */
export type Race_Records_Aggregate_Fields = {
  __typename?: 'race_records_aggregate_fields';
  avg?: Maybe<Race_Records_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Records_Max_Fields>;
  min?: Maybe<Race_Records_Min_Fields>;
  stddev?: Maybe<Race_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Race_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Race_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Race_Records_Sum_Fields>;
  var_pop?: Maybe<Race_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Race_Records_Var_Samp_Fields>;
  variance?: Maybe<Race_Records_Variance_Fields>;
};

/** aggregate fields of "race_records" */
export type Race_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Records_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Race_Records_Avg_Fields = {
  __typename?: 'race_records_avg_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "race_records". All fields are combined with a logical 'AND'. */
export type Race_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Records_Bool_Exp>>;
  _not?: InputMaybe<Race_Records_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Records_Bool_Exp>>;
  arrival?: InputMaybe<Int_Comparison_Exp>;
  course_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  race_time?: InputMaybe<Float8_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  start_time?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "race_records" */
export enum Race_Records_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  RaceRecordsPkey = 'race_records_pkey',
}

/** input type for incrementing numeric columns in table "race_records" */
export type Race_Records_Inc_Input = {
  arrival?: InputMaybe<Scalars['Int']['input']>;
  course_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  race_time?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "race_records" */
export type Race_Records_Insert_Input = {
  arrival?: InputMaybe<Scalars['Int']['input']>;
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  race_time?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Race_Records_Max_Fields = {
  __typename?: 'race_records_max_fields';
  arrival?: Maybe<Scalars['Int']['output']>;
  course_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  race_time?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Race_Records_Min_Fields = {
  __typename?: 'race_records_min_fields';
  arrival?: Maybe<Scalars['Int']['output']>;
  course_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  race_time?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "race_records" */
export type Race_Records_Mutation_Response = {
  __typename?: 'race_records_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Records>;
};

/** on_conflict condition type for table "race_records" */
export type Race_Records_On_Conflict = {
  constraint: Race_Records_Constraint;
  update_columns?: Array<Race_Records_Update_Column>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

/** Ordering options when selecting data from "race_records". */
export type Race_Records_Order_By = {
  arrival?: InputMaybe<Order_By>;
  course_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  race_time?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_records */
export type Race_Records_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "race_records" */
export enum Race_Records_Select_Column {
  /** column name */
  Arrival = 'arrival',
  /** column name */
  CourseNumber = 'course_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  RaceTime = 'race_time',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "race_records" */
export type Race_Records_Set_Input = {
  arrival?: InputMaybe<Scalars['Int']['input']>;
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  race_time?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Race_Records_Stddev_Fields = {
  __typename?: 'race_records_stddev_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Race_Records_Stddev_Pop_Fields = {
  __typename?: 'race_records_stddev_pop_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Race_Records_Stddev_Samp_Fields = {
  __typename?: 'race_records_stddev_samp_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "race_records" */
export type Race_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Records_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Records_Stream_Cursor_Value_Input = {
  arrival?: InputMaybe<Scalars['Int']['input']>;
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  race_time?: InputMaybe<Scalars['float8']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Race_Records_Sum_Fields = {
  __typename?: 'race_records_sum_fields';
  arrival?: Maybe<Scalars['Int']['output']>;
  course_number?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  race_time?: Maybe<Scalars['float8']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "race_records" */
export enum Race_Records_Update_Column {
  /** column name */
  Arrival = 'arrival',
  /** column name */
  CourseNumber = 'course_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  RaceTime = 'race_time',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Race_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Race_Records_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Records_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Records_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Race_Records_Var_Pop_Fields = {
  __typename?: 'race_records_var_pop_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Race_Records_Var_Samp_Fields = {
  __typename?: 'race_records_var_samp_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Race_Records_Variance_Fields = {
  __typename?: 'race_records_variance_fields';
  arrival?: Maybe<Scalars['Float']['output']>;
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  race_time?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "racer_conditions" */
export type Racer_Conditions = {
  __typename?: 'racer_conditions';
  adjust: Scalars['float8']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  racer_registration_number: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  weight: Scalars['float8']['output'];
};

/** aggregated selection of "racer_conditions" */
export type Racer_Conditions_Aggregate = {
  __typename?: 'racer_conditions_aggregate';
  aggregate?: Maybe<Racer_Conditions_Aggregate_Fields>;
  nodes: Array<Racer_Conditions>;
};

/** aggregate fields of "racer_conditions" */
export type Racer_Conditions_Aggregate_Fields = {
  __typename?: 'racer_conditions_aggregate_fields';
  avg?: Maybe<Racer_Conditions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Racer_Conditions_Max_Fields>;
  min?: Maybe<Racer_Conditions_Min_Fields>;
  stddev?: Maybe<Racer_Conditions_Stddev_Fields>;
  stddev_pop?: Maybe<Racer_Conditions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Racer_Conditions_Stddev_Samp_Fields>;
  sum?: Maybe<Racer_Conditions_Sum_Fields>;
  var_pop?: Maybe<Racer_Conditions_Var_Pop_Fields>;
  var_samp?: Maybe<Racer_Conditions_Var_Samp_Fields>;
  variance?: Maybe<Racer_Conditions_Variance_Fields>;
};

/** aggregate fields of "racer_conditions" */
export type Racer_Conditions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Racer_Conditions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Racer_Conditions_Avg_Fields = {
  __typename?: 'racer_conditions_avg_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "racer_conditions". All fields are combined with a logical 'AND'. */
export type Racer_Conditions_Bool_Exp = {
  _and?: InputMaybe<Array<Racer_Conditions_Bool_Exp>>;
  _not?: InputMaybe<Racer_Conditions_Bool_Exp>;
  _or?: InputMaybe<Array<Racer_Conditions_Bool_Exp>>;
  adjust?: InputMaybe<Float8_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  racer_registration_number?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  weight?: InputMaybe<Float8_Comparison_Exp>;
};

/** unique or primary key constraints on table "racer_conditions" */
export enum Racer_Conditions_Constraint {
  /** unique or primary key constraint on columns "racer_registration_number", "date" */
  RacerConditionsPkey = 'racer_conditions_pkey',
}

/** input type for incrementing numeric columns in table "racer_conditions" */
export type Racer_Conditions_Inc_Input = {
  adjust?: InputMaybe<Scalars['float8']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "racer_conditions" */
export type Racer_Conditions_Insert_Input = {
  adjust?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  weight?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate max on columns */
export type Racer_Conditions_Max_Fields = {
  __typename?: 'racer_conditions_max_fields';
  adjust?: Maybe<Scalars['float8']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  weight?: Maybe<Scalars['float8']['output']>;
};

/** aggregate min on columns */
export type Racer_Conditions_Min_Fields = {
  __typename?: 'racer_conditions_min_fields';
  adjust?: Maybe<Scalars['float8']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  weight?: Maybe<Scalars['float8']['output']>;
};

/** response of any mutation on the table "racer_conditions" */
export type Racer_Conditions_Mutation_Response = {
  __typename?: 'racer_conditions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Racer_Conditions>;
};

/** on_conflict condition type for table "racer_conditions" */
export type Racer_Conditions_On_Conflict = {
  constraint: Racer_Conditions_Constraint;
  update_columns?: Array<Racer_Conditions_Update_Column>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

/** Ordering options when selecting data from "racer_conditions". */
export type Racer_Conditions_Order_By = {
  adjust?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weight?: InputMaybe<Order_By>;
};

/** primary key columns input for table: racer_conditions */
export type Racer_Conditions_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

/** select columns of table "racer_conditions" */
export enum Racer_Conditions_Select_Column {
  /** column name */
  Adjust = 'adjust',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Weight = 'weight',
}

/** input type for updating data in table "racer_conditions" */
export type Racer_Conditions_Set_Input = {
  adjust?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  weight?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate stddev on columns */
export type Racer_Conditions_Stddev_Fields = {
  __typename?: 'racer_conditions_stddev_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Racer_Conditions_Stddev_Pop_Fields = {
  __typename?: 'racer_conditions_stddev_pop_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Racer_Conditions_Stddev_Samp_Fields = {
  __typename?: 'racer_conditions_stddev_samp_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "racer_conditions" */
export type Racer_Conditions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Racer_Conditions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Racer_Conditions_Stream_Cursor_Value_Input = {
  adjust?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  weight?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate sum on columns */
export type Racer_Conditions_Sum_Fields = {
  __typename?: 'racer_conditions_sum_fields';
  adjust?: Maybe<Scalars['float8']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "racer_conditions" */
export enum Racer_Conditions_Update_Column {
  /** column name */
  Adjust = 'adjust',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Weight = 'weight',
}

export type Racer_Conditions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Racer_Conditions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Racer_Conditions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Racer_Conditions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Racer_Conditions_Var_Pop_Fields = {
  __typename?: 'racer_conditions_var_pop_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Racer_Conditions_Var_Samp_Fields = {
  __typename?: 'racer_conditions_var_samp_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Racer_Conditions_Variance_Fields = {
  __typename?: 'racer_conditions_variance_fields';
  adjust?: Maybe<Scalars['Float']['output']>;
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations = {
  __typename?: 'racer_winning_rate_aggregations';
  aggregated_on: Scalars['date']['output'];
  created_at: Scalars['timestamp']['output'];
  racer_registration_number: Scalars['Int']['output'];
  rate_in_all_stadium: Scalars['float8']['output'];
  rate_in_event_going_stadium: Scalars['float8']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Aggregate = {
  __typename?: 'racer_winning_rate_aggregations_aggregate';
  aggregate?: Maybe<Racer_Winning_Rate_Aggregations_Aggregate_Fields>;
  nodes: Array<Racer_Winning_Rate_Aggregations>;
};

/** aggregate fields of "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Aggregate_Fields = {
  __typename?: 'racer_winning_rate_aggregations_aggregate_fields';
  avg?: Maybe<Racer_Winning_Rate_Aggregations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Racer_Winning_Rate_Aggregations_Max_Fields>;
  min?: Maybe<Racer_Winning_Rate_Aggregations_Min_Fields>;
  stddev?: Maybe<Racer_Winning_Rate_Aggregations_Stddev_Fields>;
  stddev_pop?: Maybe<Racer_Winning_Rate_Aggregations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Racer_Winning_Rate_Aggregations_Stddev_Samp_Fields>;
  sum?: Maybe<Racer_Winning_Rate_Aggregations_Sum_Fields>;
  var_pop?: Maybe<Racer_Winning_Rate_Aggregations_Var_Pop_Fields>;
  var_samp?: Maybe<Racer_Winning_Rate_Aggregations_Var_Samp_Fields>;
  variance?: Maybe<Racer_Winning_Rate_Aggregations_Variance_Fields>;
};

/** aggregate fields of "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Racer_Winning_Rate_Aggregations_Avg_Fields = {
  __typename?: 'racer_winning_rate_aggregations_avg_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "racer_winning_rate_aggregations". All fields are combined with a logical 'AND'. */
export type Racer_Winning_Rate_Aggregations_Bool_Exp = {
  _and?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Bool_Exp>>;
  _not?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
  _or?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Bool_Exp>>;
  aggregated_on?: InputMaybe<Date_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  racer_registration_number?: InputMaybe<Int_Comparison_Exp>;
  rate_in_all_stadium?: InputMaybe<Float8_Comparison_Exp>;
  rate_in_event_going_stadium?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "racer_winning_rate_aggregations" */
export enum Racer_Winning_Rate_Aggregations_Constraint {
  /** unique or primary key constraint on columns "racer_registration_number", "aggregated_on" */
  RacerWinningRateAggregationsPkey = 'racer_winning_rate_aggregations_pkey',
}

/** input type for incrementing numeric columns in table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Inc_Input = {
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  rate_in_all_stadium?: InputMaybe<Scalars['float8']['input']>;
  rate_in_event_going_stadium?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Insert_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  rate_in_all_stadium?: InputMaybe<Scalars['float8']['input']>;
  rate_in_event_going_stadium?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Racer_Winning_Rate_Aggregations_Max_Fields = {
  __typename?: 'racer_winning_rate_aggregations_max_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['float8']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Racer_Winning_Rate_Aggregations_Min_Fields = {
  __typename?: 'racer_winning_rate_aggregations_min_fields';
  aggregated_on?: Maybe<Scalars['date']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['float8']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Mutation_Response = {
  __typename?: 'racer_winning_rate_aggregations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Racer_Winning_Rate_Aggregations>;
};

/** on_conflict condition type for table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_On_Conflict = {
  constraint: Racer_Winning_Rate_Aggregations_Constraint;
  update_columns?: Array<Racer_Winning_Rate_Aggregations_Update_Column>;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

/** Ordering options when selecting data from "racer_winning_rate_aggregations". */
export type Racer_Winning_Rate_Aggregations_Order_By = {
  aggregated_on?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  racer_registration_number?: InputMaybe<Order_By>;
  rate_in_all_stadium?: InputMaybe<Order_By>;
  rate_in_event_going_stadium?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: racer_winning_rate_aggregations */
export type Racer_Winning_Rate_Aggregations_Pk_Columns_Input = {
  aggregated_on: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

/** select columns of table "racer_winning_rate_aggregations" */
export enum Racer_Winning_Rate_Aggregations_Select_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  RateInAllStadium = 'rate_in_all_stadium',
  /** column name */
  RateInEventGoingStadium = 'rate_in_event_going_stadium',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Set_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  rate_in_all_stadium?: InputMaybe<Scalars['float8']['input']>;
  rate_in_event_going_stadium?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Racer_Winning_Rate_Aggregations_Stddev_Fields = {
  __typename?: 'racer_winning_rate_aggregations_stddev_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Racer_Winning_Rate_Aggregations_Stddev_Pop_Fields = {
  __typename?: 'racer_winning_rate_aggregations_stddev_pop_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Racer_Winning_Rate_Aggregations_Stddev_Samp_Fields = {
  __typename?: 'racer_winning_rate_aggregations_stddev_samp_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "racer_winning_rate_aggregations" */
export type Racer_Winning_Rate_Aggregations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Racer_Winning_Rate_Aggregations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Racer_Winning_Rate_Aggregations_Stream_Cursor_Value_Input = {
  aggregated_on?: InputMaybe<Scalars['date']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  racer_registration_number?: InputMaybe<Scalars['Int']['input']>;
  rate_in_all_stadium?: InputMaybe<Scalars['float8']['input']>;
  rate_in_event_going_stadium?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Racer_Winning_Rate_Aggregations_Sum_Fields = {
  __typename?: 'racer_winning_rate_aggregations_sum_fields';
  racer_registration_number?: Maybe<Scalars['Int']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['float8']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "racer_winning_rate_aggregations" */
export enum Racer_Winning_Rate_Aggregations_Update_Column {
  /** column name */
  AggregatedOn = 'aggregated_on',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  RacerRegistrationNumber = 'racer_registration_number',
  /** column name */
  RateInAllStadium = 'rate_in_all_stadium',
  /** column name */
  RateInEventGoingStadium = 'rate_in_event_going_stadium',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Racer_Winning_Rate_Aggregations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Racer_Winning_Rate_Aggregations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Racer_Winning_Rate_Aggregations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Racer_Winning_Rate_Aggregations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Racer_Winning_Rate_Aggregations_Var_Pop_Fields = {
  __typename?: 'racer_winning_rate_aggregations_var_pop_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Racer_Winning_Rate_Aggregations_Var_Samp_Fields = {
  __typename?: 'racer_winning_rate_aggregations_var_samp_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Racer_Winning_Rate_Aggregations_Variance_Fields = {
  __typename?: 'racer_winning_rate_aggregations_variance_fields';
  racer_registration_number?: Maybe<Scalars['Float']['output']>;
  rate_in_all_stadium?: Maybe<Scalars['Float']['output']>;
  rate_in_event_going_stadium?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "racers" */
export type Racers = {
  __typename?: 'racers';
  birth_date?: Maybe<Scalars['date']['output']>;
  birth_prefecture_id?: Maybe<Scalars['Int']['output']>;
  branch_id?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['timestamp']['output'];
  first_name: Scalars['String']['output'];
  gender?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  last_name: Scalars['String']['output'];
  registration_number: Scalars['Int']['output'];
  status?: Maybe<Scalars['Int']['output']>;
  term?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "racers" */
export type Racers_Aggregate = {
  __typename?: 'racers_aggregate';
  aggregate?: Maybe<Racers_Aggregate_Fields>;
  nodes: Array<Racers>;
};

/** aggregate fields of "racers" */
export type Racers_Aggregate_Fields = {
  __typename?: 'racers_aggregate_fields';
  avg?: Maybe<Racers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Racers_Max_Fields>;
  min?: Maybe<Racers_Min_Fields>;
  stddev?: Maybe<Racers_Stddev_Fields>;
  stddev_pop?: Maybe<Racers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Racers_Stddev_Samp_Fields>;
  sum?: Maybe<Racers_Sum_Fields>;
  var_pop?: Maybe<Racers_Var_Pop_Fields>;
  var_samp?: Maybe<Racers_Var_Samp_Fields>;
  variance?: Maybe<Racers_Variance_Fields>;
};

/** aggregate fields of "racers" */
export type Racers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Racers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Racers_Avg_Fields = {
  __typename?: 'racers_avg_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "racers". All fields are combined with a logical 'AND'. */
export type Racers_Bool_Exp = {
  _and?: InputMaybe<Array<Racers_Bool_Exp>>;
  _not?: InputMaybe<Racers_Bool_Exp>;
  _or?: InputMaybe<Array<Racers_Bool_Exp>>;
  birth_date?: InputMaybe<Date_Comparison_Exp>;
  birth_prefecture_id?: InputMaybe<Int_Comparison_Exp>;
  branch_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  gender?: InputMaybe<Int_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  registration_number?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<Int_Comparison_Exp>;
  term?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "racers" */
export enum Racers_Constraint {
  /** unique or primary key constraint on columns "registration_number" */
  RacersPkey = 'racers_pkey',
}

/** input type for incrementing numeric columns in table "racers" */
export type Racers_Inc_Input = {
  birth_prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  branch_id?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  registration_number?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "racers" */
export type Racers_Insert_Input = {
  birth_date?: InputMaybe<Scalars['date']['input']>;
  birth_prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  branch_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  registration_number?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Racers_Max_Fields = {
  __typename?: 'racers_max_fields';
  birth_date?: Maybe<Scalars['date']['output']>;
  birth_prefecture_id?: Maybe<Scalars['Int']['output']>;
  branch_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  registration_number?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  term?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Racers_Min_Fields = {
  __typename?: 'racers_min_fields';
  birth_date?: Maybe<Scalars['date']['output']>;
  birth_prefecture_id?: Maybe<Scalars['Int']['output']>;
  branch_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  registration_number?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  term?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "racers" */
export type Racers_Mutation_Response = {
  __typename?: 'racers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Racers>;
};

/** input type for inserting object relation for remote table "racers" */
export type Racers_Obj_Rel_Insert_Input = {
  data: Racers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Racers_On_Conflict>;
};

/** on_conflict condition type for table "racers" */
export type Racers_On_Conflict = {
  constraint: Racers_Constraint;
  update_columns?: Array<Racers_Update_Column>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

/** Ordering options when selecting data from "racers". */
export type Racers_Order_By = {
  birth_date?: InputMaybe<Order_By>;
  birth_prefecture_id?: InputMaybe<Order_By>;
  branch_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  registration_number?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  term?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: racers */
export type Racers_Pk_Columns_Input = {
  registration_number: Scalars['Int']['input'];
};

/** select columns of table "racers" */
export enum Racers_Select_Column {
  /** column name */
  BirthDate = 'birth_date',
  /** column name */
  BirthPrefectureId = 'birth_prefecture_id',
  /** column name */
  BranchId = 'branch_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Gender = 'gender',
  /** column name */
  Height = 'height',
  /** column name */
  LastName = 'last_name',
  /** column name */
  RegistrationNumber = 'registration_number',
  /** column name */
  Status = 'status',
  /** column name */
  Term = 'term',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "racers" */
export type Racers_Set_Input = {
  birth_date?: InputMaybe<Scalars['date']['input']>;
  birth_prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  branch_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  registration_number?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Racers_Stddev_Fields = {
  __typename?: 'racers_stddev_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Racers_Stddev_Pop_Fields = {
  __typename?: 'racers_stddev_pop_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Racers_Stddev_Samp_Fields = {
  __typename?: 'racers_stddev_samp_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "racers" */
export type Racers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Racers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Racers_Stream_Cursor_Value_Input = {
  birth_date?: InputMaybe<Scalars['date']['input']>;
  birth_prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  branch_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  registration_number?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Racers_Sum_Fields = {
  __typename?: 'racers_sum_fields';
  birth_prefecture_id?: Maybe<Scalars['Int']['output']>;
  branch_id?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  registration_number?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  term?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "racers" */
export enum Racers_Update_Column {
  /** column name */
  BirthDate = 'birth_date',
  /** column name */
  BirthPrefectureId = 'birth_prefecture_id',
  /** column name */
  BranchId = 'branch_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Gender = 'gender',
  /** column name */
  Height = 'height',
  /** column name */
  LastName = 'last_name',
  /** column name */
  RegistrationNumber = 'registration_number',
  /** column name */
  Status = 'status',
  /** column name */
  Term = 'term',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Racers_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Racers_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Racers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Racers_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Racers_Var_Pop_Fields = {
  __typename?: 'racers_var_pop_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Racers_Var_Samp_Fields = {
  __typename?: 'racers_var_samp_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Racers_Variance_Fields = {
  __typename?: 'racers_variance_fields';
  birth_prefecture_id?: Maybe<Scalars['Float']['output']>;
  branch_id?: Maybe<Scalars['Float']['output']>;
  gender?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  registration_number?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['Float']['output']>;
  term?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "races" */
export type Races = {
  __typename?: 'races';
  betting_deadline_at?: Maybe<Scalars['timestamp']['output']>;
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  is_canceled: Scalars['Boolean']['output'];
  is_course_fixed: Scalars['Boolean']['output'];
  is_stabilizer_used: Scalars['Boolean']['output'];
  number_of_laps: Scalars['Int']['output'];
  /** An array relationship */
  raceEntries: Array<Race_Entries>;
  /** An aggregate relationship */
  raceEntries_aggregate: Race_Entries_Aggregate;
  race_number: Scalars['Int']['output'];
  /** An object relationship */
  stadium: Stadiums;
  stadium_tel_code: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** columns and relationships of "races" */
export type RacesRaceEntriesArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

/** columns and relationships of "races" */
export type RacesRaceEntries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

/** aggregated selection of "races" */
export type Races_Aggregate = {
  __typename?: 'races_aggregate';
  aggregate?: Maybe<Races_Aggregate_Fields>;
  nodes: Array<Races>;
};

/** aggregate fields of "races" */
export type Races_Aggregate_Fields = {
  __typename?: 'races_aggregate_fields';
  avg?: Maybe<Races_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Races_Max_Fields>;
  min?: Maybe<Races_Min_Fields>;
  stddev?: Maybe<Races_Stddev_Fields>;
  stddev_pop?: Maybe<Races_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Races_Stddev_Samp_Fields>;
  sum?: Maybe<Races_Sum_Fields>;
  var_pop?: Maybe<Races_Var_Pop_Fields>;
  var_samp?: Maybe<Races_Var_Samp_Fields>;
  variance?: Maybe<Races_Variance_Fields>;
};

/** aggregate fields of "races" */
export type Races_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Races_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Races_Avg_Fields = {
  __typename?: 'races_avg_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "races". All fields are combined with a logical 'AND'. */
export type Races_Bool_Exp = {
  _and?: InputMaybe<Array<Races_Bool_Exp>>;
  _not?: InputMaybe<Races_Bool_Exp>;
  _or?: InputMaybe<Array<Races_Bool_Exp>>;
  betting_deadline_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  is_canceled?: InputMaybe<Boolean_Comparison_Exp>;
  is_course_fixed?: InputMaybe<Boolean_Comparison_Exp>;
  is_stabilizer_used?: InputMaybe<Boolean_Comparison_Exp>;
  number_of_laps?: InputMaybe<Int_Comparison_Exp>;
  raceEntries?: InputMaybe<Race_Entries_Bool_Exp>;
  raceEntries_aggregate?: InputMaybe<Race_Entries_Aggregate_Bool_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium?: InputMaybe<Stadiums_Bool_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "races" */
export enum Races_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "race_number" */
  RacesPkey = 'races_pkey',
}

/** input type for incrementing numeric columns in table "races" */
export type Races_Inc_Input = {
  number_of_laps?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "races" */
export type Races_Insert_Input = {
  betting_deadline_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  is_course_fixed?: InputMaybe<Scalars['Boolean']['input']>;
  is_stabilizer_used?: InputMaybe<Scalars['Boolean']['input']>;
  number_of_laps?: InputMaybe<Scalars['Int']['input']>;
  raceEntries?: InputMaybe<Race_Entries_Arr_Rel_Insert_Input>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium?: InputMaybe<Stadiums_Obj_Rel_Insert_Input>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Races_Max_Fields = {
  __typename?: 'races_max_fields';
  betting_deadline_at?: Maybe<Scalars['timestamp']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  number_of_laps?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Races_Min_Fields = {
  __typename?: 'races_min_fields';
  betting_deadline_at?: Maybe<Scalars['timestamp']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  number_of_laps?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "races" */
export type Races_Mutation_Response = {
  __typename?: 'races_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Races>;
};

/** on_conflict condition type for table "races" */
export type Races_On_Conflict = {
  constraint: Races_Constraint;
  update_columns?: Array<Races_Update_Column>;
  where?: InputMaybe<Races_Bool_Exp>;
};

/** Ordering options when selecting data from "races". */
export type Races_Order_By = {
  betting_deadline_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  is_canceled?: InputMaybe<Order_By>;
  is_course_fixed?: InputMaybe<Order_By>;
  is_stabilizer_used?: InputMaybe<Order_By>;
  number_of_laps?: InputMaybe<Order_By>;
  raceEntries_aggregate?: InputMaybe<Race_Entries_Aggregate_Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium?: InputMaybe<Stadiums_Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: races */
export type Races_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "races" */
export enum Races_Select_Column {
  /** column name */
  BettingDeadlineAt = 'betting_deadline_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsCanceled = 'is_canceled',
  /** column name */
  IsCourseFixed = 'is_course_fixed',
  /** column name */
  IsStabilizerUsed = 'is_stabilizer_used',
  /** column name */
  NumberOfLaps = 'number_of_laps',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "races" */
export type Races_Set_Input = {
  betting_deadline_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  is_course_fixed?: InputMaybe<Scalars['Boolean']['input']>;
  is_stabilizer_used?: InputMaybe<Scalars['Boolean']['input']>;
  number_of_laps?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Races_Stddev_Fields = {
  __typename?: 'races_stddev_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Races_Stddev_Pop_Fields = {
  __typename?: 'races_stddev_pop_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Races_Stddev_Samp_Fields = {
  __typename?: 'races_stddev_samp_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "races" */
export type Races_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Races_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Races_Stream_Cursor_Value_Input = {
  betting_deadline_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_canceled?: InputMaybe<Scalars['Boolean']['input']>;
  is_course_fixed?: InputMaybe<Scalars['Boolean']['input']>;
  is_stabilizer_used?: InputMaybe<Scalars['Boolean']['input']>;
  number_of_laps?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Races_Sum_Fields = {
  __typename?: 'races_sum_fields';
  number_of_laps?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "races" */
export enum Races_Update_Column {
  /** column name */
  BettingDeadlineAt = 'betting_deadline_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsCanceled = 'is_canceled',
  /** column name */
  IsCourseFixed = 'is_course_fixed',
  /** column name */
  IsStabilizerUsed = 'is_stabilizer_used',
  /** column name */
  NumberOfLaps = 'number_of_laps',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Races_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Races_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Races_Set_Input>;
  /** filter the rows which have to be updated */
  where: Races_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Races_Var_Pop_Fields = {
  __typename?: 'races_var_pop_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Races_Var_Samp_Fields = {
  __typename?: 'races_var_samp_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Races_Variance_Fields = {
  __typename?: 'races_variance_fields';
  number_of_laps?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "stadiums" */
export type Stadiums = {
  __typename?: 'stadiums';
  created_at: Scalars['timestamp']['output'];
  elevation: Scalars['float8']['output'];
  has_tide_fluctuation: Scalars['Boolean']['output'];
  lat: Scalars['float8']['output'];
  lng: Scalars['float8']['output'];
  name: Scalars['String']['output'];
  prefecture_id: Scalars['Int']['output'];
  tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  water_quality: Scalars['Int']['output'];
};

/** aggregated selection of "stadiums" */
export type Stadiums_Aggregate = {
  __typename?: 'stadiums_aggregate';
  aggregate?: Maybe<Stadiums_Aggregate_Fields>;
  nodes: Array<Stadiums>;
};

/** aggregate fields of "stadiums" */
export type Stadiums_Aggregate_Fields = {
  __typename?: 'stadiums_aggregate_fields';
  avg?: Maybe<Stadiums_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Stadiums_Max_Fields>;
  min?: Maybe<Stadiums_Min_Fields>;
  stddev?: Maybe<Stadiums_Stddev_Fields>;
  stddev_pop?: Maybe<Stadiums_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Stadiums_Stddev_Samp_Fields>;
  sum?: Maybe<Stadiums_Sum_Fields>;
  var_pop?: Maybe<Stadiums_Var_Pop_Fields>;
  var_samp?: Maybe<Stadiums_Var_Samp_Fields>;
  variance?: Maybe<Stadiums_Variance_Fields>;
};

/** aggregate fields of "stadiums" */
export type Stadiums_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stadiums_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Stadiums_Avg_Fields = {
  __typename?: 'stadiums_avg_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "stadiums". All fields are combined with a logical 'AND'. */
export type Stadiums_Bool_Exp = {
  _and?: InputMaybe<Array<Stadiums_Bool_Exp>>;
  _not?: InputMaybe<Stadiums_Bool_Exp>;
  _or?: InputMaybe<Array<Stadiums_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  elevation?: InputMaybe<Float8_Comparison_Exp>;
  has_tide_fluctuation?: InputMaybe<Boolean_Comparison_Exp>;
  lat?: InputMaybe<Float8_Comparison_Exp>;
  lng?: InputMaybe<Float8_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  prefecture_id?: InputMaybe<Int_Comparison_Exp>;
  tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  water_quality?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "stadiums" */
export enum Stadiums_Constraint {
  /** unique or primary key constraint on columns "tel_code" */
  StadiumsPkey = 'stadiums_pkey',
}

/** input type for incrementing numeric columns in table "stadiums" */
export type Stadiums_Inc_Input = {
  elevation?: InputMaybe<Scalars['float8']['input']>;
  lat?: InputMaybe<Scalars['float8']['input']>;
  lng?: InputMaybe<Scalars['float8']['input']>;
  prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  tel_code?: InputMaybe<Scalars['Int']['input']>;
  water_quality?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "stadiums" */
export type Stadiums_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  elevation?: InputMaybe<Scalars['float8']['input']>;
  has_tide_fluctuation?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['float8']['input']>;
  lng?: InputMaybe<Scalars['float8']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_quality?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Stadiums_Max_Fields = {
  __typename?: 'stadiums_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  elevation?: Maybe<Scalars['float8']['output']>;
  lat?: Maybe<Scalars['float8']['output']>;
  lng?: Maybe<Scalars['float8']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  prefecture_id?: Maybe<Scalars['Int']['output']>;
  tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  water_quality?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Stadiums_Min_Fields = {
  __typename?: 'stadiums_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  elevation?: Maybe<Scalars['float8']['output']>;
  lat?: Maybe<Scalars['float8']['output']>;
  lng?: Maybe<Scalars['float8']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  prefecture_id?: Maybe<Scalars['Int']['output']>;
  tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  water_quality?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "stadiums" */
export type Stadiums_Mutation_Response = {
  __typename?: 'stadiums_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Stadiums>;
};

/** input type for inserting object relation for remote table "stadiums" */
export type Stadiums_Obj_Rel_Insert_Input = {
  data: Stadiums_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Stadiums_On_Conflict>;
};

/** on_conflict condition type for table "stadiums" */
export type Stadiums_On_Conflict = {
  constraint: Stadiums_Constraint;
  update_columns?: Array<Stadiums_Update_Column>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

/** Ordering options when selecting data from "stadiums". */
export type Stadiums_Order_By = {
  created_at?: InputMaybe<Order_By>;
  elevation?: InputMaybe<Order_By>;
  has_tide_fluctuation?: InputMaybe<Order_By>;
  lat?: InputMaybe<Order_By>;
  lng?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  prefecture_id?: InputMaybe<Order_By>;
  tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  water_quality?: InputMaybe<Order_By>;
};

/** primary key columns input for table: stadiums */
export type Stadiums_Pk_Columns_Input = {
  tel_code: Scalars['Int']['input'];
};

/** select columns of table "stadiums" */
export enum Stadiums_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Elevation = 'elevation',
  /** column name */
  HasTideFluctuation = 'has_tide_fluctuation',
  /** column name */
  Lat = 'lat',
  /** column name */
  Lng = 'lng',
  /** column name */
  Name = 'name',
  /** column name */
  PrefectureId = 'prefecture_id',
  /** column name */
  TelCode = 'tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WaterQuality = 'water_quality',
}

/** input type for updating data in table "stadiums" */
export type Stadiums_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  elevation?: InputMaybe<Scalars['float8']['input']>;
  has_tide_fluctuation?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['float8']['input']>;
  lng?: InputMaybe<Scalars['float8']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_quality?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Stadiums_Stddev_Fields = {
  __typename?: 'stadiums_stddev_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Stadiums_Stddev_Pop_Fields = {
  __typename?: 'stadiums_stddev_pop_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Stadiums_Stddev_Samp_Fields = {
  __typename?: 'stadiums_stddev_samp_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "stadiums" */
export type Stadiums_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stadiums_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Stadiums_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  elevation?: InputMaybe<Scalars['float8']['input']>;
  has_tide_fluctuation?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['float8']['input']>;
  lng?: InputMaybe<Scalars['float8']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  prefecture_id?: InputMaybe<Scalars['Int']['input']>;
  tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_quality?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Stadiums_Sum_Fields = {
  __typename?: 'stadiums_sum_fields';
  elevation?: Maybe<Scalars['float8']['output']>;
  lat?: Maybe<Scalars['float8']['output']>;
  lng?: Maybe<Scalars['float8']['output']>;
  prefecture_id?: Maybe<Scalars['Int']['output']>;
  tel_code?: Maybe<Scalars['Int']['output']>;
  water_quality?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "stadiums" */
export enum Stadiums_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Elevation = 'elevation',
  /** column name */
  HasTideFluctuation = 'has_tide_fluctuation',
  /** column name */
  Lat = 'lat',
  /** column name */
  Lng = 'lng',
  /** column name */
  Name = 'name',
  /** column name */
  PrefectureId = 'prefecture_id',
  /** column name */
  TelCode = 'tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WaterQuality = 'water_quality',
}

export type Stadiums_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Stadiums_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Stadiums_Set_Input>;
  /** filter the rows which have to be updated */
  where: Stadiums_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Stadiums_Var_Pop_Fields = {
  __typename?: 'stadiums_var_pop_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Stadiums_Var_Samp_Fields = {
  __typename?: 'stadiums_var_samp_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Stadiums_Variance_Fields = {
  __typename?: 'stadiums_variance_fields';
  elevation?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  prefecture_id?: Maybe<Scalars['Float']['output']>;
  tel_code?: Maybe<Scalars['Float']['output']>;
  water_quality?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "start_exhibition_records" */
export type Start_Exhibition_Records = {
  __typename?: 'start_exhibition_records';
  course_number: Scalars['Int']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  start_time: Scalars['float8']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "start_exhibition_records" */
export type Start_Exhibition_Records_Aggregate = {
  __typename?: 'start_exhibition_records_aggregate';
  aggregate?: Maybe<Start_Exhibition_Records_Aggregate_Fields>;
  nodes: Array<Start_Exhibition_Records>;
};

/** aggregate fields of "start_exhibition_records" */
export type Start_Exhibition_Records_Aggregate_Fields = {
  __typename?: 'start_exhibition_records_aggregate_fields';
  avg?: Maybe<Start_Exhibition_Records_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Start_Exhibition_Records_Max_Fields>;
  min?: Maybe<Start_Exhibition_Records_Min_Fields>;
  stddev?: Maybe<Start_Exhibition_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Start_Exhibition_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Start_Exhibition_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Start_Exhibition_Records_Sum_Fields>;
  var_pop?: Maybe<Start_Exhibition_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Start_Exhibition_Records_Var_Samp_Fields>;
  variance?: Maybe<Start_Exhibition_Records_Variance_Fields>;
};

/** aggregate fields of "start_exhibition_records" */
export type Start_Exhibition_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Start_Exhibition_Records_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Start_Exhibition_Records_Avg_Fields = {
  __typename?: 'start_exhibition_records_avg_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "start_exhibition_records". All fields are combined with a logical 'AND'. */
export type Start_Exhibition_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Start_Exhibition_Records_Bool_Exp>>;
  _not?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
  _or?: InputMaybe<Array<Start_Exhibition_Records_Bool_Exp>>;
  course_number?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  start_time?: InputMaybe<Float8_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "start_exhibition_records" */
export enum Start_Exhibition_Records_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  StartExhibitionRecordsPkey = 'start_exhibition_records_pkey',
}

/** input type for incrementing numeric columns in table "start_exhibition_records" */
export type Start_Exhibition_Records_Inc_Input = {
  course_number?: InputMaybe<Scalars['Int']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "start_exhibition_records" */
export type Start_Exhibition_Records_Insert_Input = {
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Start_Exhibition_Records_Max_Fields = {
  __typename?: 'start_exhibition_records_max_fields';
  course_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Start_Exhibition_Records_Min_Fields = {
  __typename?: 'start_exhibition_records_min_fields';
  course_number?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "start_exhibition_records" */
export type Start_Exhibition_Records_Mutation_Response = {
  __typename?: 'start_exhibition_records_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Start_Exhibition_Records>;
};

/** on_conflict condition type for table "start_exhibition_records" */
export type Start_Exhibition_Records_On_Conflict = {
  constraint: Start_Exhibition_Records_Constraint;
  update_columns?: Array<Start_Exhibition_Records_Update_Column>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

/** Ordering options when selecting data from "start_exhibition_records". */
export type Start_Exhibition_Records_Order_By = {
  course_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: start_exhibition_records */
export type Start_Exhibition_Records_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "start_exhibition_records" */
export enum Start_Exhibition_Records_Select_Column {
  /** column name */
  CourseNumber = 'course_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "start_exhibition_records" */
export type Start_Exhibition_Records_Set_Input = {
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Start_Exhibition_Records_Stddev_Fields = {
  __typename?: 'start_exhibition_records_stddev_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Start_Exhibition_Records_Stddev_Pop_Fields = {
  __typename?: 'start_exhibition_records_stddev_pop_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Start_Exhibition_Records_Stddev_Samp_Fields = {
  __typename?: 'start_exhibition_records_stddev_samp_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "start_exhibition_records" */
export type Start_Exhibition_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Start_Exhibition_Records_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Start_Exhibition_Records_Stream_Cursor_Value_Input = {
  course_number?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['float8']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Start_Exhibition_Records_Sum_Fields = {
  __typename?: 'start_exhibition_records_sum_fields';
  course_number?: Maybe<Scalars['Int']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "start_exhibition_records" */
export enum Start_Exhibition_Records_Update_Column {
  /** column name */
  CourseNumber = 'course_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Start_Exhibition_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Start_Exhibition_Records_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Start_Exhibition_Records_Set_Input>;
  /** filter the rows which have to be updated */
  where: Start_Exhibition_Records_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Start_Exhibition_Records_Var_Pop_Fields = {
  __typename?: 'start_exhibition_records_var_pop_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Start_Exhibition_Records_Var_Samp_Fields = {
  __typename?: 'start_exhibition_records_var_samp_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Start_Exhibition_Records_Variance_Fields = {
  __typename?: 'start_exhibition_records_variance_fields';
  course_number?: Maybe<Scalars['Float']['output']>;
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "boat_betting_contribute_rate_aggregations" */
  boat_betting_contribute_rate_aggregations: Array<Boat_Betting_Contribute_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "boat_betting_contribute_rate_aggregations" */
  boat_betting_contribute_rate_aggregations_aggregate: Boat_Betting_Contribute_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "boat_betting_contribute_rate_aggregations" using primary key columns */
  boat_betting_contribute_rate_aggregations_by_pk?: Maybe<Boat_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table in a streaming manner: "boat_betting_contribute_rate_aggregations" */
  boat_betting_contribute_rate_aggregations_stream: Array<Boat_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table: "boat_settings" */
  boat_settings: Array<Boat_Settings>;
  /** fetch aggregated fields from the table: "boat_settings" */
  boat_settings_aggregate: Boat_Settings_Aggregate;
  /** fetch data from the table: "boat_settings" using primary key columns */
  boat_settings_by_pk?: Maybe<Boat_Settings>;
  /** fetch data from the table in a streaming manner: "boat_settings" */
  boat_settings_stream: Array<Boat_Settings>;
  /** fetch data from the table: "circumference_exhibition_records" */
  circumference_exhibition_records: Array<Circumference_Exhibition_Records>;
  /** fetch aggregated fields from the table: "circumference_exhibition_records" */
  circumference_exhibition_records_aggregate: Circumference_Exhibition_Records_Aggregate;
  /** fetch data from the table: "circumference_exhibition_records" using primary key columns */
  circumference_exhibition_records_by_pk?: Maybe<Circumference_Exhibition_Records>;
  /** fetch data from the table in a streaming manner: "circumference_exhibition_records" */
  circumference_exhibition_records_stream: Array<Circumference_Exhibition_Records>;
  /** fetch data from the table: "disqualified_race_entries" */
  disqualified_race_entries: Array<Disqualified_Race_Entries>;
  /** fetch aggregated fields from the table: "disqualified_race_entries" */
  disqualified_race_entries_aggregate: Disqualified_Race_Entries_Aggregate;
  /** fetch data from the table: "disqualified_race_entries" using primary key columns */
  disqualified_race_entries_by_pk?: Maybe<Disqualified_Race_Entries>;
  /** fetch data from the table in a streaming manner: "disqualified_race_entries" */
  disqualified_race_entries_stream: Array<Disqualified_Race_Entries>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** fetch data from the table: "motor_betting_contribute_rate_aggregations" */
  motor_betting_contribute_rate_aggregations: Array<Motor_Betting_Contribute_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "motor_betting_contribute_rate_aggregations" */
  motor_betting_contribute_rate_aggregations_aggregate: Motor_Betting_Contribute_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "motor_betting_contribute_rate_aggregations" using primary key columns */
  motor_betting_contribute_rate_aggregations_by_pk?: Maybe<Motor_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table in a streaming manner: "motor_betting_contribute_rate_aggregations" */
  motor_betting_contribute_rate_aggregations_stream: Array<Motor_Betting_Contribute_Rate_Aggregations>;
  /** fetch data from the table: "motor_maintenances" */
  motor_maintenances: Array<Motor_Maintenances>;
  /** fetch aggregated fields from the table: "motor_maintenances" */
  motor_maintenances_aggregate: Motor_Maintenances_Aggregate;
  /** fetch data from the table: "motor_maintenances" using primary key columns */
  motor_maintenances_by_pk?: Maybe<Motor_Maintenances>;
  /** fetch data from the table in a streaming manner: "motor_maintenances" */
  motor_maintenances_stream: Array<Motor_Maintenances>;
  /** fetch data from the table: "motor_renewals" */
  motor_renewals: Array<Motor_Renewals>;
  /** fetch aggregated fields from the table: "motor_renewals" */
  motor_renewals_aggregate: Motor_Renewals_Aggregate;
  /** fetch data from the table: "motor_renewals" using primary key columns */
  motor_renewals_by_pk?: Maybe<Motor_Renewals>;
  /** fetch data from the table in a streaming manner: "motor_renewals" */
  motor_renewals_stream: Array<Motor_Renewals>;
  /** fetch data from the table: "odds" */
  odds: Array<Odds>;
  /** fetch aggregated fields from the table: "odds" */
  odds_aggregate: Odds_Aggregate;
  /** fetch data from the table: "odds" using primary key columns */
  odds_by_pk?: Maybe<Odds>;
  /** fetch data from the table in a streaming manner: "odds" */
  odds_stream: Array<Odds>;
  /** fetch data from the table: "payoffs" */
  payoffs: Array<Payoffs>;
  /** fetch aggregated fields from the table: "payoffs" */
  payoffs_aggregate: Payoffs_Aggregate;
  /** fetch data from the table: "payoffs" using primary key columns */
  payoffs_by_pk?: Maybe<Payoffs>;
  /** fetch data from the table in a streaming manner: "payoffs" */
  payoffs_stream: Array<Payoffs>;
  /** fetch data from the table: "race_entries" */
  race_entries: Array<Race_Entries>;
  /** fetch aggregated fields from the table: "race_entries" */
  race_entries_aggregate: Race_Entries_Aggregate;
  /** fetch data from the table: "race_entries" using primary key columns */
  race_entries_by_pk?: Maybe<Race_Entries>;
  /** fetch data from the table in a streaming manner: "race_entries" */
  race_entries_stream: Array<Race_Entries>;
  /** fetch data from the table: "race_records" */
  race_records: Array<Race_Records>;
  /** fetch aggregated fields from the table: "race_records" */
  race_records_aggregate: Race_Records_Aggregate;
  /** fetch data from the table: "race_records" using primary key columns */
  race_records_by_pk?: Maybe<Race_Records>;
  /** fetch data from the table in a streaming manner: "race_records" */
  race_records_stream: Array<Race_Records>;
  /** fetch data from the table: "racer_conditions" */
  racer_conditions: Array<Racer_Conditions>;
  /** fetch aggregated fields from the table: "racer_conditions" */
  racer_conditions_aggregate: Racer_Conditions_Aggregate;
  /** fetch data from the table: "racer_conditions" using primary key columns */
  racer_conditions_by_pk?: Maybe<Racer_Conditions>;
  /** fetch data from the table in a streaming manner: "racer_conditions" */
  racer_conditions_stream: Array<Racer_Conditions>;
  /** fetch data from the table: "racer_winning_rate_aggregations" */
  racer_winning_rate_aggregations: Array<Racer_Winning_Rate_Aggregations>;
  /** fetch aggregated fields from the table: "racer_winning_rate_aggregations" */
  racer_winning_rate_aggregations_aggregate: Racer_Winning_Rate_Aggregations_Aggregate;
  /** fetch data from the table: "racer_winning_rate_aggregations" using primary key columns */
  racer_winning_rate_aggregations_by_pk?: Maybe<Racer_Winning_Rate_Aggregations>;
  /** fetch data from the table in a streaming manner: "racer_winning_rate_aggregations" */
  racer_winning_rate_aggregations_stream: Array<Racer_Winning_Rate_Aggregations>;
  /** fetch data from the table: "racers" */
  racers: Array<Racers>;
  /** fetch aggregated fields from the table: "racers" */
  racers_aggregate: Racers_Aggregate;
  /** fetch data from the table: "racers" using primary key columns */
  racers_by_pk?: Maybe<Racers>;
  /** fetch data from the table in a streaming manner: "racers" */
  racers_stream: Array<Racers>;
  /** fetch data from the table: "races" */
  races: Array<Races>;
  /** fetch aggregated fields from the table: "races" */
  races_aggregate: Races_Aggregate;
  /** fetch data from the table: "races" using primary key columns */
  races_by_pk?: Maybe<Races>;
  /** fetch data from the table in a streaming manner: "races" */
  races_stream: Array<Races>;
  /** fetch data from the table: "stadiums" */
  stadiums: Array<Stadiums>;
  /** fetch aggregated fields from the table: "stadiums" */
  stadiums_aggregate: Stadiums_Aggregate;
  /** fetch data from the table: "stadiums" using primary key columns */
  stadiums_by_pk?: Maybe<Stadiums>;
  /** fetch data from the table in a streaming manner: "stadiums" */
  stadiums_stream: Array<Stadiums>;
  /** fetch data from the table: "start_exhibition_records" */
  start_exhibition_records: Array<Start_Exhibition_Records>;
  /** fetch aggregated fields from the table: "start_exhibition_records" */
  start_exhibition_records_aggregate: Start_Exhibition_Records_Aggregate;
  /** fetch data from the table: "start_exhibition_records" using primary key columns */
  start_exhibition_records_by_pk?: Maybe<Start_Exhibition_Records>;
  /** fetch data from the table in a streaming manner: "start_exhibition_records" */
  start_exhibition_records_stream: Array<Start_Exhibition_Records>;
  /** fetch data from the table: "weather_conditions" */
  weather_conditions: Array<Weather_Conditions>;
  /** fetch aggregated fields from the table: "weather_conditions" */
  weather_conditions_aggregate: Weather_Conditions_Aggregate;
  /** fetch data from the table: "weather_conditions" using primary key columns */
  weather_conditions_by_pk?: Maybe<Weather_Conditions>;
  /** fetch data from the table in a streaming manner: "weather_conditions" */
  weather_conditions_stream: Array<Weather_Conditions>;
  /** fetch data from the table: "winning_race_entries" */
  winning_race_entries: Array<Winning_Race_Entries>;
  /** fetch aggregated fields from the table: "winning_race_entries" */
  winning_race_entries_aggregate: Winning_Race_Entries_Aggregate;
  /** fetch data from the table: "winning_race_entries" using primary key columns */
  winning_race_entries_by_pk?: Maybe<Winning_Race_Entries>;
  /** fetch data from the table in a streaming manner: "winning_race_entries" */
  winning_race_entries_stream: Array<Winning_Race_Entries>;
};

export type Subscription_RootBoat_Betting_Contribute_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Boat_Betting_Contribute_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<
    Array<Boat_Betting_Contribute_Rate_Aggregations_Order_By>
  >;
  where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

export type Subscription_RootBoat_Betting_Contribute_Rate_Aggregations_AggregateArgs =
  {
    distinct_on?: InputMaybe<
      Array<Boat_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<
      Array<Boat_Betting_Contribute_Rate_Aggregations_Order_By>
    >;
    where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Subscription_RootBoat_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    aggregated_on: Scalars['date']['input'];
    boat_number: Scalars['Int']['input'];
    stadium_tel_code: Scalars['Int']['input'];
  };

export type Subscription_RootBoat_Betting_Contribute_Rate_Aggregations_StreamArgs =
  {
    batch_size: Scalars['Int']['input'];
    cursor: Array<
      InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Input>
    >;
    where?: InputMaybe<Boat_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Subscription_RootBoat_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Boat_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Boat_Settings_Order_By>>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

export type Subscription_RootBoat_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Boat_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Boat_Settings_Order_By>>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

export type Subscription_RootBoat_Settings_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootBoat_Settings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Boat_Settings_Stream_Cursor_Input>>;
  where?: InputMaybe<Boat_Settings_Bool_Exp>;
};

export type Subscription_RootCircumference_Exhibition_RecordsArgs = {
  distinct_on?: InputMaybe<
    Array<Circumference_Exhibition_Records_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circumference_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootCircumference_Exhibition_Records_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Circumference_Exhibition_Records_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circumference_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootCircumference_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootCircumference_Exhibition_Records_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<
    InputMaybe<Circumference_Exhibition_Records_Stream_Cursor_Input>
  >;
  where?: InputMaybe<Circumference_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootDisqualified_Race_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Disqualified_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Disqualified_Race_Entries_Order_By>>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

export type Subscription_RootDisqualified_Race_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Disqualified_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Disqualified_Race_Entries_Order_By>>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

export type Subscription_RootDisqualified_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootDisqualified_Race_Entries_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Disqualified_Race_Entries_Stream_Cursor_Input>>;
  where?: InputMaybe<Disqualified_Race_Entries_Bool_Exp>;
};

export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_By_PkArgs = {
  stadium_tel_code: Scalars['Int']['input'];
  starts_on: Scalars['date']['input'];
  title: Scalars['String']['input'];
};

export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootMotor_Betting_Contribute_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Motor_Betting_Contribute_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<
    Array<Motor_Betting_Contribute_Rate_Aggregations_Order_By>
  >;
  where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
};

export type Subscription_RootMotor_Betting_Contribute_Rate_Aggregations_AggregateArgs =
  {
    distinct_on?: InputMaybe<
      Array<Motor_Betting_Contribute_Rate_Aggregations_Select_Column>
    >;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<
      Array<Motor_Betting_Contribute_Rate_Aggregations_Order_By>
    >;
    where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Subscription_RootMotor_Betting_Contribute_Rate_Aggregations_By_PkArgs =
  {
    aggregated_on: Scalars['date']['input'];
    motor_number: Scalars['Int']['input'];
    stadium_tel_code: Scalars['Int']['input'];
  };

export type Subscription_RootMotor_Betting_Contribute_Rate_Aggregations_StreamArgs =
  {
    batch_size: Scalars['Int']['input'];
    cursor: Array<
      InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Stream_Cursor_Input>
    >;
    where?: InputMaybe<Motor_Betting_Contribute_Rate_Aggregations_Bool_Exp>;
  };

export type Subscription_RootMotor_MaintenancesArgs = {
  distinct_on?: InputMaybe<Array<Motor_Maintenances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Maintenances_Order_By>>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

export type Subscription_RootMotor_Maintenances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motor_Maintenances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Maintenances_Order_By>>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

export type Subscription_RootMotor_Maintenances_By_PkArgs = {
  date: Scalars['date']['input'];
  exchanged_parts: Scalars['Int']['input'];
  motor_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootMotor_Maintenances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Motor_Maintenances_Stream_Cursor_Input>>;
  where?: InputMaybe<Motor_Maintenances_Bool_Exp>;
};

export type Subscription_RootMotor_RenewalsArgs = {
  distinct_on?: InputMaybe<Array<Motor_Renewals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Renewals_Order_By>>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

export type Subscription_RootMotor_Renewals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Motor_Renewals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Motor_Renewals_Order_By>>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

export type Subscription_RootMotor_Renewals_By_PkArgs = {
  date: Scalars['date']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootMotor_Renewals_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Motor_Renewals_Stream_Cursor_Input>>;
  where?: InputMaybe<Motor_Renewals_Bool_Exp>;
};

export type Subscription_RootOddsArgs = {
  distinct_on?: InputMaybe<Array<Odds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Odds_Order_By>>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

export type Subscription_RootOdds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Odds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Odds_Order_By>>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

export type Subscription_RootOdds_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootOdds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Odds_Stream_Cursor_Input>>;
  where?: InputMaybe<Odds_Bool_Exp>;
};

export type Subscription_RootPayoffsArgs = {
  distinct_on?: InputMaybe<Array<Payoffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payoffs_Order_By>>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

export type Subscription_RootPayoffs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payoffs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payoffs_Order_By>>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

export type Subscription_RootPayoffs_By_PkArgs = {
  betting_method: Scalars['Int']['input'];
  betting_number: Scalars['Int']['input'];
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootPayoffs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Payoffs_Stream_Cursor_Input>>;
  where?: InputMaybe<Payoffs_Bool_Exp>;
};

export type Subscription_RootRace_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

export type Subscription_RootRace_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Entries_Order_By>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

export type Subscription_RootRace_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootRace_Entries_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Entries_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Entries_Bool_Exp>;
};

export type Subscription_RootRace_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Race_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Records_Order_By>>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

export type Subscription_RootRace_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Records_Order_By>>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

export type Subscription_RootRace_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootRace_Records_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Records_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Records_Bool_Exp>;
};

export type Subscription_RootRacer_ConditionsArgs = {
  distinct_on?: InputMaybe<Array<Racer_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Conditions_Order_By>>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

export type Subscription_RootRacer_Conditions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Racer_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Conditions_Order_By>>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

export type Subscription_RootRacer_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

export type Subscription_RootRacer_Conditions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Racer_Conditions_Stream_Cursor_Input>>;
  where?: InputMaybe<Racer_Conditions_Bool_Exp>;
};

export type Subscription_RootRacer_Winning_Rate_AggregationsArgs = {
  distinct_on?: InputMaybe<
    Array<Racer_Winning_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Order_By>>;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

export type Subscription_RootRacer_Winning_Rate_Aggregations_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Racer_Winning_Rate_Aggregations_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racer_Winning_Rate_Aggregations_Order_By>>;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

export type Subscription_RootRacer_Winning_Rate_Aggregations_By_PkArgs = {
  aggregated_on: Scalars['date']['input'];
  racer_registration_number: Scalars['Int']['input'];
};

export type Subscription_RootRacer_Winning_Rate_Aggregations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<
    InputMaybe<Racer_Winning_Rate_Aggregations_Stream_Cursor_Input>
  >;
  where?: InputMaybe<Racer_Winning_Rate_Aggregations_Bool_Exp>;
};

export type Subscription_RootRacersArgs = {
  distinct_on?: InputMaybe<Array<Racers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racers_Order_By>>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

export type Subscription_RootRacers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Racers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Racers_Order_By>>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

export type Subscription_RootRacers_By_PkArgs = {
  registration_number: Scalars['Int']['input'];
};

export type Subscription_RootRacers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Racers_Stream_Cursor_Input>>;
  where?: InputMaybe<Racers_Bool_Exp>;
};

export type Subscription_RootRacesArgs = {
  distinct_on?: InputMaybe<Array<Races_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Races_Order_By>>;
  where?: InputMaybe<Races_Bool_Exp>;
};

export type Subscription_RootRaces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Races_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Races_Order_By>>;
  where?: InputMaybe<Races_Bool_Exp>;
};

export type Subscription_RootRaces_By_PkArgs = {
  date: Scalars['date']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootRaces_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Races_Stream_Cursor_Input>>;
  where?: InputMaybe<Races_Bool_Exp>;
};

export type Subscription_RootStadiumsArgs = {
  distinct_on?: InputMaybe<Array<Stadiums_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stadiums_Order_By>>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

export type Subscription_RootStadiums_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stadiums_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stadiums_Order_By>>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

export type Subscription_RootStadiums_By_PkArgs = {
  tel_code: Scalars['Int']['input'];
};

export type Subscription_RootStadiums_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Stadiums_Stream_Cursor_Input>>;
  where?: InputMaybe<Stadiums_Bool_Exp>;
};

export type Subscription_RootStart_Exhibition_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Start_Exhibition_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Start_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootStart_Exhibition_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Start_Exhibition_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Start_Exhibition_Records_Order_By>>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootStart_Exhibition_Records_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootStart_Exhibition_Records_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Start_Exhibition_Records_Stream_Cursor_Input>>;
  where?: InputMaybe<Start_Exhibition_Records_Bool_Exp>;
};

export type Subscription_RootWeather_ConditionsArgs = {
  distinct_on?: InputMaybe<Array<Weather_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Conditions_Order_By>>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

export type Subscription_RootWeather_Conditions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Conditions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Conditions_Order_By>>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

export type Subscription_RootWeather_Conditions_By_PkArgs = {
  date: Scalars['date']['input'];
  is_in_performance: Scalars['Boolean']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootWeather_Conditions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Weather_Conditions_Stream_Cursor_Input>>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

export type Subscription_RootWinning_Race_EntriesArgs = {
  distinct_on?: InputMaybe<Array<Winning_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Winning_Race_Entries_Order_By>>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

export type Subscription_RootWinning_Race_Entries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Winning_Race_Entries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Winning_Race_Entries_Order_By>>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

export type Subscription_RootWinning_Race_Entries_By_PkArgs = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

export type Subscription_RootWinning_Race_Entries_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Winning_Race_Entries_Stream_Cursor_Input>>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** columns and relationships of "weather_conditions" */
export type Weather_Conditions = {
  __typename?: 'weather_conditions';
  air_temperature: Scalars['float8']['output'];
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  is_in_performance: Scalars['Boolean']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  water_temperature: Scalars['float8']['output'];
  wavelength?: Maybe<Scalars['float8']['output']>;
  weather: Scalars['Int']['output'];
  wind_angle?: Maybe<Scalars['float8']['output']>;
  wind_velocity: Scalars['float8']['output'];
};

/** aggregated selection of "weather_conditions" */
export type Weather_Conditions_Aggregate = {
  __typename?: 'weather_conditions_aggregate';
  aggregate?: Maybe<Weather_Conditions_Aggregate_Fields>;
  nodes: Array<Weather_Conditions>;
};

/** aggregate fields of "weather_conditions" */
export type Weather_Conditions_Aggregate_Fields = {
  __typename?: 'weather_conditions_aggregate_fields';
  avg?: Maybe<Weather_Conditions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Weather_Conditions_Max_Fields>;
  min?: Maybe<Weather_Conditions_Min_Fields>;
  stddev?: Maybe<Weather_Conditions_Stddev_Fields>;
  stddev_pop?: Maybe<Weather_Conditions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Weather_Conditions_Stddev_Samp_Fields>;
  sum?: Maybe<Weather_Conditions_Sum_Fields>;
  var_pop?: Maybe<Weather_Conditions_Var_Pop_Fields>;
  var_samp?: Maybe<Weather_Conditions_Var_Samp_Fields>;
  variance?: Maybe<Weather_Conditions_Variance_Fields>;
};

/** aggregate fields of "weather_conditions" */
export type Weather_Conditions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Weather_Conditions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Weather_Conditions_Avg_Fields = {
  __typename?: 'weather_conditions_avg_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "weather_conditions". All fields are combined with a logical 'AND'. */
export type Weather_Conditions_Bool_Exp = {
  _and?: InputMaybe<Array<Weather_Conditions_Bool_Exp>>;
  _not?: InputMaybe<Weather_Conditions_Bool_Exp>;
  _or?: InputMaybe<Array<Weather_Conditions_Bool_Exp>>;
  air_temperature?: InputMaybe<Float8_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  is_in_performance?: InputMaybe<Boolean_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  water_temperature?: InputMaybe<Float8_Comparison_Exp>;
  wavelength?: InputMaybe<Float8_Comparison_Exp>;
  weather?: InputMaybe<Int_Comparison_Exp>;
  wind_angle?: InputMaybe<Float8_Comparison_Exp>;
  wind_velocity?: InputMaybe<Float8_Comparison_Exp>;
};

/** unique or primary key constraints on table "weather_conditions" */
export enum Weather_Conditions_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "race_number", "is_in_performance" */
  WeatherConditionsPkey = 'weather_conditions_pkey',
}

/** input type for incrementing numeric columns in table "weather_conditions" */
export type Weather_Conditions_Inc_Input = {
  air_temperature?: InputMaybe<Scalars['float8']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  water_temperature?: InputMaybe<Scalars['float8']['input']>;
  wavelength?: InputMaybe<Scalars['float8']['input']>;
  weather?: InputMaybe<Scalars['Int']['input']>;
  wind_angle?: InputMaybe<Scalars['float8']['input']>;
  wind_velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "weather_conditions" */
export type Weather_Conditions_Insert_Input = {
  air_temperature?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_in_performance?: InputMaybe<Scalars['Boolean']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_temperature?: InputMaybe<Scalars['float8']['input']>;
  wavelength?: InputMaybe<Scalars['float8']['input']>;
  weather?: InputMaybe<Scalars['Int']['input']>;
  wind_angle?: InputMaybe<Scalars['float8']['input']>;
  wind_velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate max on columns */
export type Weather_Conditions_Max_Fields = {
  __typename?: 'weather_conditions_max_fields';
  air_temperature?: Maybe<Scalars['float8']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  water_temperature?: Maybe<Scalars['float8']['output']>;
  wavelength?: Maybe<Scalars['float8']['output']>;
  weather?: Maybe<Scalars['Int']['output']>;
  wind_angle?: Maybe<Scalars['float8']['output']>;
  wind_velocity?: Maybe<Scalars['float8']['output']>;
};

/** aggregate min on columns */
export type Weather_Conditions_Min_Fields = {
  __typename?: 'weather_conditions_min_fields';
  air_temperature?: Maybe<Scalars['float8']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  water_temperature?: Maybe<Scalars['float8']['output']>;
  wavelength?: Maybe<Scalars['float8']['output']>;
  weather?: Maybe<Scalars['Int']['output']>;
  wind_angle?: Maybe<Scalars['float8']['output']>;
  wind_velocity?: Maybe<Scalars['float8']['output']>;
};

/** response of any mutation on the table "weather_conditions" */
export type Weather_Conditions_Mutation_Response = {
  __typename?: 'weather_conditions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Weather_Conditions>;
};

/** on_conflict condition type for table "weather_conditions" */
export type Weather_Conditions_On_Conflict = {
  constraint: Weather_Conditions_Constraint;
  update_columns?: Array<Weather_Conditions_Update_Column>;
  where?: InputMaybe<Weather_Conditions_Bool_Exp>;
};

/** Ordering options when selecting data from "weather_conditions". */
export type Weather_Conditions_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  is_in_performance?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  water_temperature?: InputMaybe<Order_By>;
  wavelength?: InputMaybe<Order_By>;
  weather?: InputMaybe<Order_By>;
  wind_angle?: InputMaybe<Order_By>;
  wind_velocity?: InputMaybe<Order_By>;
};

/** primary key columns input for table: weather_conditions */
export type Weather_Conditions_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  is_in_performance: Scalars['Boolean']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "weather_conditions" */
export enum Weather_Conditions_Select_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsInPerformance = 'is_in_performance',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WaterTemperature = 'water_temperature',
  /** column name */
  Wavelength = 'wavelength',
  /** column name */
  Weather = 'weather',
  /** column name */
  WindAngle = 'wind_angle',
  /** column name */
  WindVelocity = 'wind_velocity',
}

/** input type for updating data in table "weather_conditions" */
export type Weather_Conditions_Set_Input = {
  air_temperature?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_in_performance?: InputMaybe<Scalars['Boolean']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_temperature?: InputMaybe<Scalars['float8']['input']>;
  wavelength?: InputMaybe<Scalars['float8']['input']>;
  weather?: InputMaybe<Scalars['Int']['input']>;
  wind_angle?: InputMaybe<Scalars['float8']['input']>;
  wind_velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate stddev on columns */
export type Weather_Conditions_Stddev_Fields = {
  __typename?: 'weather_conditions_stddev_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Weather_Conditions_Stddev_Pop_Fields = {
  __typename?: 'weather_conditions_stddev_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Weather_Conditions_Stddev_Samp_Fields = {
  __typename?: 'weather_conditions_stddev_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "weather_conditions" */
export type Weather_Conditions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Weather_Conditions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Weather_Conditions_Stream_Cursor_Value_Input = {
  air_temperature?: InputMaybe<Scalars['float8']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  is_in_performance?: InputMaybe<Scalars['Boolean']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  water_temperature?: InputMaybe<Scalars['float8']['input']>;
  wavelength?: InputMaybe<Scalars['float8']['input']>;
  weather?: InputMaybe<Scalars['Int']['input']>;
  wind_angle?: InputMaybe<Scalars['float8']['input']>;
  wind_velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate sum on columns */
export type Weather_Conditions_Sum_Fields = {
  __typename?: 'weather_conditions_sum_fields';
  air_temperature?: Maybe<Scalars['float8']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  water_temperature?: Maybe<Scalars['float8']['output']>;
  wavelength?: Maybe<Scalars['float8']['output']>;
  weather?: Maybe<Scalars['Int']['output']>;
  wind_angle?: Maybe<Scalars['float8']['output']>;
  wind_velocity?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "weather_conditions" */
export enum Weather_Conditions_Update_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  IsInPerformance = 'is_in_performance',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WaterTemperature = 'water_temperature',
  /** column name */
  Wavelength = 'wavelength',
  /** column name */
  Weather = 'weather',
  /** column name */
  WindAngle = 'wind_angle',
  /** column name */
  WindVelocity = 'wind_velocity',
}

export type Weather_Conditions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Weather_Conditions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Weather_Conditions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Weather_Conditions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Weather_Conditions_Var_Pop_Fields = {
  __typename?: 'weather_conditions_var_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Weather_Conditions_Var_Samp_Fields = {
  __typename?: 'weather_conditions_var_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Weather_Conditions_Variance_Fields = {
  __typename?: 'weather_conditions_variance_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  water_temperature?: Maybe<Scalars['Float']['output']>;
  wavelength?: Maybe<Scalars['Float']['output']>;
  weather?: Maybe<Scalars['Float']['output']>;
  wind_angle?: Maybe<Scalars['Float']['output']>;
  wind_velocity?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "winning_race_entries" */
export type Winning_Race_Entries = {
  __typename?: 'winning_race_entries';
  created_at: Scalars['timestamp']['output'];
  date: Scalars['date']['output'];
  pit_number: Scalars['Int']['output'];
  race_number: Scalars['Int']['output'];
  stadium_tel_code: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  winning_trick: Scalars['Int']['output'];
};

/** aggregated selection of "winning_race_entries" */
export type Winning_Race_Entries_Aggregate = {
  __typename?: 'winning_race_entries_aggregate';
  aggregate?: Maybe<Winning_Race_Entries_Aggregate_Fields>;
  nodes: Array<Winning_Race_Entries>;
};

/** aggregate fields of "winning_race_entries" */
export type Winning_Race_Entries_Aggregate_Fields = {
  __typename?: 'winning_race_entries_aggregate_fields';
  avg?: Maybe<Winning_Race_Entries_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Winning_Race_Entries_Max_Fields>;
  min?: Maybe<Winning_Race_Entries_Min_Fields>;
  stddev?: Maybe<Winning_Race_Entries_Stddev_Fields>;
  stddev_pop?: Maybe<Winning_Race_Entries_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Winning_Race_Entries_Stddev_Samp_Fields>;
  sum?: Maybe<Winning_Race_Entries_Sum_Fields>;
  var_pop?: Maybe<Winning_Race_Entries_Var_Pop_Fields>;
  var_samp?: Maybe<Winning_Race_Entries_Var_Samp_Fields>;
  variance?: Maybe<Winning_Race_Entries_Variance_Fields>;
};

/** aggregate fields of "winning_race_entries" */
export type Winning_Race_Entries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Winning_Race_Entries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Winning_Race_Entries_Avg_Fields = {
  __typename?: 'winning_race_entries_avg_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "winning_race_entries". All fields are combined with a logical 'AND'. */
export type Winning_Race_Entries_Bool_Exp = {
  _and?: InputMaybe<Array<Winning_Race_Entries_Bool_Exp>>;
  _not?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
  _or?: InputMaybe<Array<Winning_Race_Entries_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  pit_number?: InputMaybe<Int_Comparison_Exp>;
  race_number?: InputMaybe<Int_Comparison_Exp>;
  stadium_tel_code?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  winning_trick?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "winning_race_entries" */
export enum Winning_Race_Entries_Constraint {
  /** unique or primary key constraint on columns "stadium_tel_code", "date", "pit_number", "race_number" */
  WinningRaceEntriesPkey = 'winning_race_entries_pkey',
}

/** input type for incrementing numeric columns in table "winning_race_entries" */
export type Winning_Race_Entries_Inc_Input = {
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  winning_trick?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "winning_race_entries" */
export type Winning_Race_Entries_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  winning_trick?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Winning_Race_Entries_Max_Fields = {
  __typename?: 'winning_race_entries_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  winning_trick?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Winning_Race_Entries_Min_Fields = {
  __typename?: 'winning_race_entries_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  winning_trick?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "winning_race_entries" */
export type Winning_Race_Entries_Mutation_Response = {
  __typename?: 'winning_race_entries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Winning_Race_Entries>;
};

/** on_conflict condition type for table "winning_race_entries" */
export type Winning_Race_Entries_On_Conflict = {
  constraint: Winning_Race_Entries_Constraint;
  update_columns?: Array<Winning_Race_Entries_Update_Column>;
  where?: InputMaybe<Winning_Race_Entries_Bool_Exp>;
};

/** Ordering options when selecting data from "winning_race_entries". */
export type Winning_Race_Entries_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  pit_number?: InputMaybe<Order_By>;
  race_number?: InputMaybe<Order_By>;
  stadium_tel_code?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  winning_trick?: InputMaybe<Order_By>;
};

/** primary key columns input for table: winning_race_entries */
export type Winning_Race_Entries_Pk_Columns_Input = {
  date: Scalars['date']['input'];
  pit_number: Scalars['Int']['input'];
  race_number: Scalars['Int']['input'];
  stadium_tel_code: Scalars['Int']['input'];
};

/** select columns of table "winning_race_entries" */
export enum Winning_Race_Entries_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WinningTrick = 'winning_trick',
}

/** input type for updating data in table "winning_race_entries" */
export type Winning_Race_Entries_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  winning_trick?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Winning_Race_Entries_Stddev_Fields = {
  __typename?: 'winning_race_entries_stddev_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Winning_Race_Entries_Stddev_Pop_Fields = {
  __typename?: 'winning_race_entries_stddev_pop_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Winning_Race_Entries_Stddev_Samp_Fields = {
  __typename?: 'winning_race_entries_stddev_samp_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "winning_race_entries" */
export type Winning_Race_Entries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Winning_Race_Entries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Winning_Race_Entries_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  pit_number?: InputMaybe<Scalars['Int']['input']>;
  race_number?: InputMaybe<Scalars['Int']['input']>;
  stadium_tel_code?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  winning_trick?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Winning_Race_Entries_Sum_Fields = {
  __typename?: 'winning_race_entries_sum_fields';
  pit_number?: Maybe<Scalars['Int']['output']>;
  race_number?: Maybe<Scalars['Int']['output']>;
  stadium_tel_code?: Maybe<Scalars['Int']['output']>;
  winning_trick?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "winning_race_entries" */
export enum Winning_Race_Entries_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  PitNumber = 'pit_number',
  /** column name */
  RaceNumber = 'race_number',
  /** column name */
  StadiumTelCode = 'stadium_tel_code',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WinningTrick = 'winning_trick',
}

export type Winning_Race_Entries_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Winning_Race_Entries_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Winning_Race_Entries_Set_Input>;
  /** filter the rows which have to be updated */
  where: Winning_Race_Entries_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Winning_Race_Entries_Var_Pop_Fields = {
  __typename?: 'winning_race_entries_var_pop_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Winning_Race_Entries_Var_Samp_Fields = {
  __typename?: 'winning_race_entries_var_samp_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Winning_Race_Entries_Variance_Fields = {
  __typename?: 'winning_race_entries_variance_fields';
  pit_number?: Maybe<Scalars['Float']['output']>;
  race_number?: Maybe<Scalars['Float']['output']>;
  stadium_tel_code?: Maybe<Scalars['Float']['output']>;
  winning_trick?: Maybe<Scalars['Float']['output']>;
};
