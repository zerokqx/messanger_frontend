// // types/react.d.ts
// import 'react';
//
// declare module 'react' {
//   interface HTMLAttributes<T> {
//     skeleton?: string;
//   }
//
//   // Расширяем React.ComponentProps для кастомных компонентов
//   interface ComponentProps<T extends keyof JSX.IntrinsicElements> {
//     skeleton?: string;
//   }
//
//   // Расширяем FunctionComponent
//   interface FunctionComponent<P = {}> {
//     (props: P & { skeleton?: string }): ReactElement<any, any> | null;
//   }
//
//   // Расширяем JSX.IntrinsicElements
//   interface JSX {
//     IntrinsicElements {
//       [K in keyof IntrinsicElements]: IntrinsicElements[K] & {
//         skeleton?: string;
//       };
//     }
//   }
// }
