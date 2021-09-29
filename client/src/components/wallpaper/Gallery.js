export function Gallery(props) {
  const { wallpapers = [], onSelect } = props;

  function onItemSelect(wallpaper) {
    onSelect?.(wallpaper);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {wallpapers.filter(Boolean).map((wallpaper) => {
        const { id, thumbnail } = wallpaper;
        return (
          <div key={id} onClick={() => onItemSelect(wallpaper)}>
            <img key={id} src={thumbnail} alt={id} />
          </div>
        );
      })}
    </div>
  );
}
