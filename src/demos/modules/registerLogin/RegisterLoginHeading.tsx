export function RegisterLoginHeading(props: { title: string; description: string; id?: string }) {
  return (
    <div class="auth-heading">
      <h1 id={props.id ?? "authTitle"}>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}
