export type Content = {
  id: number;
  title: string;
  description: string;
  body?: string;
  t_content_id: number;
  create_time: Date;
  fields?: any;
  t_taxonomy?: any;
};
export type ContentType = {
  id: number;
  name: string;
  description: Text;
  create_time: Date;
  t_field: FieldType[];
  t_taxonomy: TaxonomyType[];
};
export type TaxonomyType = {
  id: number;
  name: string;
  description: Text;
  create_time: Date;
};
export type FieldType = {
  id: number;
  name: string;
  t_content_id: number;
  data_type: string;
  create_time: Date;
};
