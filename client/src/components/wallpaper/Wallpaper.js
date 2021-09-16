import styles from "./Wallpaper.module.css";

const testurl =
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

export function Wallpaper() {
  const style = {
    "--wallpaper": `url(${testurl})`,
  };
  return (
    <div className={styles.wallpaper} style={style}>
      {/* <WallhavenWrapper /> */}
    </div>
  );
}
