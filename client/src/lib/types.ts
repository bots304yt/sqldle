export type Containers = { 
    [key: string]: {
      title: string;
      color?: string;
      items: Item[];
    } 
};
export type Item = {
    value: string;
    state: string;
}
export type DraggedItem = { item: Item; source: string };