import React, {useState, useEffect, useRef} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Graph } from "react-d3-graph";
import './OutputContainer.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutputContainer() {

    const[graphContainer, setgraphContainer] = useState(0);
    const[graphHeight, setgraphHeight] = useState(500);
    const[graphWidth, setgraphWidth] = useState(800);
    const[selectedNodeId, setSelectedNodeId] = useState(null);

    const graph = useRef(null);
    
    useEffect(() => {
        networkClick();
        setgraphWidth(graph.current.offsetWidth+250);
        setgraphHeight(graph.current.offsetHeight-40);
    }, []);

    const myConfig = {
        d3: {
            gravity: -150,
        },
        height: graphHeight,
        width: graphWidth,
        nodeHighlightBehavior: true,
        node: {
            //strokeColor: "000000",
            //strokeWidth: 5,
            // color: "#6bc36b",
            color: '#f14668',
            highlightStrokeColor: "black",
            labelProperty: "name",
        },
        link: {
            color: "#00000020",
            highlightColor: "black",
        },
    };

   
    const onClickNode = function(nodeId) {
        setSelectedNodeId(nodeId);
    };
       
    const onDoubleClickNode = function(nodeId) {
        setSelectedNodeId(null);        
    }

    const [poets, setPoets] = useState([]);
    const [patrons, setPatrons] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [poems, setPoems] = useState([]);
    const [location, setLocation] = useState([]);
    const [category, setCategory] = useState([]);

    async function networkClick() {
        
        let locResponse = await fetch ("/locations");
        let locJson = await locResponse.json();
        setLocation(locJson);
        console.log({location});

        let categoryResponse = await fetch("/categories");
        let catJson = await categoryResponse.json();
        setCategory(catJson);
        console.log({category});

        let poetsResponse = await fetch('/poets');
        let poetsJson = await poetsResponse.json();
        let poetSize = poetsJson.map(e => e.poems.length);
        poetsJson = poetsJson.map((e, i) => { e.uid = e.id; e.color = "#5cace2"; e.size = e.poems.length * 200; return e;})
        console.log(poetsJson);
        setPoets(poetsJson);
       
        let poetpatrons = poetsJson.map(poet => poet.patrons.map(e => ({source: poet.id, target : -e.id})) ).reduce((acc, e) => [...acc, ...e]);
        let poetPoems = poetsJson.map(poet => poet.poems.map(e => ({source: poet.id, target : e.id + 1000 })) ).reduce((acc, e) => [...acc, ...e]);

        console.log(poetpatrons);
        console.log(poetPoems);
        setLinks([...poetpatrons, ...poetPoems]);

        let patronResponse = await fetch('/patrons');
        let patronsJson= await patronResponse.json();       
        
        patronsJson = patronsJson.map((e,i)=> {e.uid = e.id; e.id = -e.id; e.size = e.poets.length * 200; return e;});
        setPatrons(patronsJson);
        
        console.log({patronsJson});
        let poemsResponse = await fetch('/poems');
        let poemsJson= await poemsResponse.json();       
        console.log({poemsJson});

        poemsJson = poemsJson.map((e,i)=> {e.color="#00000020"; e.renderLabel = false; e.uid = e.id; e.id = i + 1001; return e;});
        setPoems(poemsJson);
        setNodes([...poetsJson, ...patronsJson, ...poemsJson]);
    }


    // graph payload (with minimalist structure)
    const cleanedLinks = links.map(e => `${e.source}:${e.target}`)
                              .filter((e, i, arr) => arr.indexOf(e) === i)
                              .map(e => { let eTokens = e.split(":"); return { source: parseInt(eTokens[0]), target: parseInt(eTokens[1])}; });
    const data = {
        nodes: nodes,
        links: cleanedLinks,
    };

    // console.log("executed", links.map(e => `${e.source}:${e.target}`), cleanedLinks);

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const getLocation = (id) => {
        const filteredLocations = location.filter(e => e.id === id);
        if (filteredLocations.length > 0) return filteredLocations[0].name;
    }
    const getCategory = (id) => {
        const filteredCategories = category.filter(e => e.id === id);
        if (filteredCategories.length > 0) return filteredCategories[0].name;
    }
    const getNodeType = (id) => {
        if(id < 0) return "Patron";
        if(id > 0) return (id > 1000? "Poem" : "Poet");
    }

    let selectedNode = nodes.filter(e => e.id === parseInt(selectedNodeId))[0];
    if(selectedNode != null) {
        selectedNode.type = getNodeType(selectedNode.id);
        if(selectedNode.type === "Poem") {
            let categoryIds = selectedNode.categories.map(e => e.id);
            selectedNode.details = categoryIds.map(e => getCategory(e)).join(', ');
            selectedNode.extraDetails = selectedNode.poemText;
        }
        else {
            selectedNode.details = getLocation(selectedNode.location_id);
            selectedNode.extraDetails = "";
        }
        
    } else {
        selectedNode = {name: "", details: "", type: "", extraDetails: ""};
    }

    const learnMoreClick = () => {
        if(selectedNode != null) {
            let url = '/admin';
            url += "/" + selectedNode.type.toLowerCase();
            url += "/" + selectedNode.uid;
            window.open(url, '_blank');
        }
    }

    return (
        
        <div className= "OutputContainer" ref={graph}>
            <div>    
                {
                    nodes.length > 0 && 
                    <Graph 
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={data}
                        config={myConfig}
                        onClickNode={onClickNode}
                        onDoubleClickNode={onDoubleClickNode}
                      />
                }
            </div>
            <div className={clsx("graphCards", { "show": selectedNode.id != null })} >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {selectedNode.type}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {selectedNode.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {selectedNode.details}
                        </Typography>
                        <Typography variant="body2" component="p">
                        {selectedNode.extraDetails}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={learnMoreClick}>Learn More</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="graphLegend" >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={clsx("legendCircleWrapper", {"active": selectedNode.type === "Poet"})} variant="body2" color="textSecondary" component="p">
                           <div className="legendCircle poet"></div>
                            Poet
                        </Typography>
                        <Typography className={clsx("legendCircleWrapper", {"active": selectedNode.type === "Patron"})} variant="body2" color="textSecondary" component="p">
                            <div className="legendCircle patron"></div>
                            Patron
                        </Typography>
                        <Typography className={clsx("legendCircleWrapper", {"active": selectedNode.type === "Poem"})} variant="body2" color="textSecondary" component="p">
                            <div className="legendCircle poem"></div>
                            Poem
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

