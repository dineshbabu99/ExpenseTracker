




export function SpendCard(props: { title: string; amount: number    | string }) {
    return (
        <div className="cardbg p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-white">{props.title}</h3>
            
<p
  className={`${
    props.title === "Total Spending"
      ? "text-green-500"
      : props.title === "This Month"
      ? "text-blue-500"
      : "text-purple-500"
  } mb-1 bold text-2xl`
  }
>
  {props.amount}
</p>        </div>
    )
}