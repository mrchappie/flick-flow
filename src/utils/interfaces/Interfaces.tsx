export interface Filters {
  heading: string;
  filters: { name: string; placeholder: string; input: string }[];
}

export interface StyledComponentProps {
  customStyle: React.CSSProperties;
}
