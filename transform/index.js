import xmlJsConvert from "xml-js";

// cli_test ./xml-js warn.bpmn.xml --no-decl --trim --no-comment  --no-doctype --no-cdata  --compact true   --name-key shape   --out ./bpmnXml2Json.json

// const bpmnNodeEnum = ["bpmn:startEvent", "bpmn:userTask", "bpmn:parallelGateway", "bpmn:endEvent"];
// const bpmnEdgeEnum = ["bpmn:sequenceFlow"];
// const bpmndiEnum = ["bpmndi:BPMNShape", "bpmndi:BPMNEdge"];

function deduceArrary(obj) {
  if (Object.prototype.toString.call(obj) == '[object Array]') {
    return obj;
  } else {
    return [obj];
  }
}
export default {
  bpmnXml2Json(bpmnXmlStr) {
    let options = {
      compact: true, // 紧凑模式，输出数组聚类
      trim: true, // string trim
      alwaysArray: false, // 避免判断子元素是obj或arr,仅适用于紧凑输出compact:true
      ignoreDeclaration: true, // 是否忽略解析声明属性。也就是说declaration不会生成任何属性。
      ignoreInstruction: true, // 是否忽略解析处理指令属性。也就是说instruction不会生成任何属性。
      ignoreComment: true, // 是否忽略元素的解析注释。
      ignoreCdata: true, // 是否忽略解析元素的 CData
      ignoreDoctype: true, // 是否忽略解析元素的 Doctype
    };

    let srcStr;
    let srcJson;
    try {
      srcStr = xmlJsConvert.xml2json(bpmnXmlStr, options);
      srcJson = JSON.parse(srcStr);
    }catch (e){
      console.error("转换失败:JSON.PARSE",e)
      return [];
    }

    let bpmn_process;
    // TODO NULL、bpmn:definitions、bpmn:process判断
    try {
      bpmn_process = srcJson["bpmn:definitions"]["bpmn:process"];
    }catch (e){
      console.error("转换失败:必要结构不完整",e)
      return [];
    }

    let bpmnNodes = [];
    for (let bpmnProcessKey in bpmn_process) {
      if (bpmnProcessKey == "bpmn:documentation"
        || bpmnProcessKey == "_attributes") {
        continue;
      }
      bpmnNodes.push(...deduceArrary(bpmn_process[bpmnProcessKey]).map(n => {
        return {
          ...n,
          "id": n._attributes.id,
          "label": n._attributes.name ? n._attributes.name : "",
          "shape": bpmnProcessKey,
        }
      }))
    }
    let nodes = bpmnNodes.filter(f => {
      return f.shape != "bpmn:sequenceFlow"
    });
    let edges = bpmnNodes.filter(f => {
      return f.shape == "bpmn:sequenceFlow"
    }).map(e => {
      return {
        ...e,
        "source": e._attributes.sourceRef,
        "target": e._attributes.targetRef,
      }
    });
    // TODO NULL判断、bpmn:definitions、bpmn:BPMNDiagram、bpmndi:BPMNPlane判断
    // TODO 坐标宽高null判断
    // TODO <bpmndi:BPMNLabel /> di:waypoint （incoming，outgoing） 解析
    try {
      let bpmndi_BPMNPlane = srcJson["bpmn:definitions"]["bpmndi:BPMNDiagram"]["bpmndi:BPMNPlane"];
      let bpmndi_BPMNShape = deduceArrary(bpmndi_BPMNPlane["bpmndi:BPMNShape"]);
      bpmndi_BPMNShape.forEach(s => {
        nodes.forEach(n => {
          if (n.id == s._attributes.bpmnElement) {
            n.width = Number(s["dc:Bounds"]["_attributes"].width);
            n.height = Number(s["dc:Bounds"]["_attributes"].height);
            n.position = {
              x: Number(s["dc:Bounds"]["_attributes"].x),
              y: Number(s["dc:Bounds"]["_attributes"].y),
            }
          }
        })
      })
    }catch (e){
      console.error("转换失败:位置、大小信息缺失",e)
    }
    return [...nodes,...edges];
  }
}

