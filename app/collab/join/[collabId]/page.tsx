
function page({ params }: { params: { collabId: string } }) {
  return (
    <div>
        <div>My Post: {params.collabId}</div>
    </div>
  )
}

export default page
