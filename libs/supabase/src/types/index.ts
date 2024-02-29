export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      question_options: {
        Row: {
          id: number;
          item_id: number | null;
          option_text: string;
        };
        Insert: {
          id?: never;
          item_id?: number | null;
          option_text: string;
        };
        Update: {
          id?: never;
          item_id?: number | null;
          option_text?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'question_options_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: false;
            referencedRelation: 'survey_items';
            referencedColumns: ['id'];
          }
        ];
      };
      survey_items: {
        Row: {
          hasOption: boolean | null;
          id: number;
          question_required: boolean;
          question_title: string;
          question_type: string;
          section_id: number | null;
        };
        Insert: {
          hasOption?: boolean | null;
          id?: never;
          question_required: boolean;
          question_title: string;
          question_type: string;
          section_id?: number | null;
        };
        Update: {
          hasOption?: boolean | null;
          id?: never;
          question_required?: boolean;
          question_title?: string;
          question_type?: string;
          section_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'survey_items_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'survey_sections';
            referencedColumns: ['id'];
          }
        ];
      };
      survey_sections: {
        Row: {
          id: number;
          section_id: number | null;
          survey_id: number | null;
          survey_title: string | null;
        };
        Insert: {
          id?: never;
          section_id?: number | null;
          survey_id?: number | null;
          survey_title?: string | null;
        };
        Update: {
          id?: never;
          section_id?: number | null;
          survey_id?: number | null;
          survey_title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'survey_sections_survey_id_fkey';
            columns: ['survey_id'];
            isOneToOne: false;
            referencedRelation: 'surveys';
            referencedColumns: ['id'];
          }
        ];
      };
      surveys: {
        Row: {
          description: string | null;
          id: number;
          title: string;
        };
        Insert: {
          description?: string | null;
          id?: never;
          title: string;
        };
        Update: {
          description?: string | null;
          id?: never;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
