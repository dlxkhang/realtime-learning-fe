import { ISlide } from 'interfaces'

function ParagraphSlideSetting({ slide }: { slide: ISlide }) {
    console.log(slide)
    return (
        <div className="heading-content">
            <h1>Paragraph Content</h1>
        </div>
    )
}
export default ParagraphSlideSetting
