export function RegisterLoginSwitch(props: { prompt: string; label: string; onClick: () => void }) {
  return (
    <p class="mobile-switch">
      {props.prompt}{" "}
      <button class="text-button" type="button" onClick={props.onClick}>
        {props.label}
      </button>
    </p>
  )
}
