interface RoomLabelProps {
  /** Re-keyed on change so the fade-in animation replays per room. */
  room: string | undefined;
}

/** Fixed bottom-right label naming the room currently in view. */
export default function RoomLabel({ room }: RoomLabelProps) {
  return (
    <div className="room-label room-name-tag" key={room} aria-hidden="true">
      {room}
    </div>
  );
}
