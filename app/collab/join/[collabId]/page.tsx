import JoinCollab from "./JoinCollab"

function page({ params }: { params: { collabId: string } }) {
  return (
    <div>
        <JoinCollab collabId={params.collabId}/>
    </div>
  )
}

export default page
