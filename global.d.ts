declare type PrivLevel = 'master' | 'admin' | 'mod' | 'user';
declare type FCWC<V extends {[key: string]: any} = {}> = import('react').FC<{children: import('react').ReactNode} & V>