declare type PrivLevel = 'master' | 'admin' | 'mod' | 'client' | 'user';
declare type FCWC<V extends {[key: string]: any} = {}> = import('react').FC<{children: import('react').ReactNode} & V>
declare type Image = {src: string, width: number, height: number};
