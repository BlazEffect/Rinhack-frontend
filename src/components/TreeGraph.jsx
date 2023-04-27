import { Tree } from "react-tree-graph";

const TreeGraph = ({ data }) => (
    <div className="custom-container">
        <Tree
            data={data}
            height={1600}
            width={1600}
            children={<text style={{dy: 15, dx: 5}}>ya lox</text>}
            textProps={{x: '23'}}
            nodeProps={{height: 40, width: 40, href: 'https://jpb12.github.io/react-tree-graph/disc.png'}}
            nodeShape={'image'}
            svgProps={
                {className: "custom"}
            }
        />
    </div>
)

export default TreeGraph