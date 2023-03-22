<template>
  <div id="container" style="width:100%;height:600px;border:1px solid red">bpmnViewer</div>
</template>
<script>
import {Graph} from '@antv/x6';
import transform from "../transform/"

export default {
  name: 'bpmnViewer',
  mounted() {
    this.initGraph()
  },
  methods: {
    initGraph() {

      // TODO 注册其他process标签，和workflow常用标签优化
      // <scriptTask/>
      // <manualTask/>
      // <receiveTask/>
      // <serviceTask/>
      // <businessRuleTask/>
      // <exclusiveGateway/>
      // <parallelGateway/>
      // <sequenceFlow/>
      // <subProcess/>
      // <boundaryEvent/>

      Graph.registerNode(
        'bpmn:startEvent',
        {
          inherit: 'circle',
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: '#5F95FF',
              fill: '#FFF',
            },
          },
        },
        true,
      );

      Graph.registerNode(
        'bpmn:endEvent',
        {
          inherit: 'circle',
          attrs: {
            body: {
              strokeWidth: 10,
              stroke: '#5F95FF',
              fill: '#FFF',
            },
          },
        },
        true,
      );

      Graph.registerNode(
        'bpmn:userTask',
        {
          inherit: 'rect',
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'image',
              selector: 'img',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              rx: 6,
              ry: 6,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              strokeWidth: 1,
            },
            img: {
              x: 6,
              y: 6,
              width: 16,
              height: 16,
              'xlink:href':
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ',
            },
            label: {
              fontSize: 12,
              fill: '#262626',
            },
          },
        },
        true,
      )

      Graph.registerNode(
        'bpmn:task',
        {
          inherit: 'rect',
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'image',
              selector: 'img',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              rx: 6,
              ry: 6,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              strokeWidth: 1,
            },
            img: {
              x: 6,
              y: 6,
              width: 16,
              height: 16,
              'xlink:href':
                'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ',
            },
            label: {
              fontSize: 12,
              fill: '#262626',
            },
          },
        },
        true,
      )

      Graph.registerNode(
        'bpmn:parallelGateway',
        {
          inherit: 'polygon',
          attrs: {
            body: {
              refPoints: '0,10 10,0 20,10 10,20',
              strokeWidth: 2,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            label: {
              text: '+',
              fontSize: 40,
              fill: '#5F95FF',
            },
          },
        },
        true,
      )

      Graph.registerNode(
        'bpmn:exclusiveGateway',
        {
          inherit: 'polygon',
          attrs: {
            body: {
              refPoints: '0,10 10,0 20,10 10,20',
              strokeWidth: 2,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            label: {
              text: '+',
              fontSize: 40,
              fill: '#5F95FF',
            },
          },
        },
        true,
      )

      Graph.registerEdge(
        'bpmn:sequenceFlow',
        {
          inherit: 'edge',
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
            },
          },
        },
        true,
      )

      const graph = new Graph({
        container: document.getElementById('container'),
        connecting: {
          router: 'orth',
        },
      })

      let testBpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:activiti="http://activiti.org/bpmn" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1" isExecutable="true"><bpmn:startEvent id="StartEvent_1"><bpmn:outgoing>Flow_17bdcm9</bpmn:outgoing></bpmn:startEvent><bpmn:userTask id="Activity_0qsg2n9" name="1" activiti:formKey="14"><bpmn:documentation /><bpmn:incoming>Flow_17bdcm9</bpmn:incoming><bpmn:outgoing>Flow_06ntpaq</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_17bdcm9" sourceRef="StartEvent_1" targetRef="Activity_0qsg2n9" /><bpmn:exclusiveGateway id="Gateway_0fdpu1z"><bpmn:incoming>Flow_06ntpaq</bpmn:incoming><bpmn:outgoing>Flow_13uhr7d</bpmn:outgoing><bpmn:outgoing>Flow_0twa9kl</bpmn:outgoing></bpmn:exclusiveGateway><bpmn:sequenceFlow id="Flow_06ntpaq" sourceRef="Activity_0qsg2n9" targetRef="Gateway_0fdpu1z" /><bpmn:userTask id="Activity_1svpxg9" name="2" activiti:formKey="18"><bpmn:documentation /><bpmn:incoming>Flow_13uhr7d</bpmn:incoming><bpmn:outgoing>Flow_1utnfxr</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_13uhr7d" sourceRef="Gateway_0fdpu1z" targetRef="Activity_1svpxg9"><bpmn:documentation /><bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${Activity_0qsg2n9.processResult=="20"}</bpmn:conditionExpression></bpmn:sequenceFlow><bpmn:userTask id="Activity_1oop8ev" name="3" activiti:formKey="15"><bpmn:documentation /><bpmn:incoming>Flow_0twa9kl</bpmn:incoming><bpmn:outgoing>Flow_1mt6jle</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_0twa9kl" sourceRef="Gateway_0fdpu1z" targetRef="Activity_1oop8ev" /><bpmn:endEvent id="Event_0bge02e"><bpmn:incoming>Flow_1utnfxr</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id="Flow_1utnfxr" sourceRef="Activity_1svpxg9" targetRef="Event_0bge02e" /><bpmn:endEvent id="Event_0yp1zwk"><bpmn:incoming>Flow_1mt6jle</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id="Flow_1mt6jle" sourceRef="Activity_1oop8ev" targetRef="Event_0yp1zwk" /></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1"><dc:Bounds x="173" y="102" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0qsg2n9_di" bpmnElement="Activity_0qsg2n9"><dc:Bounds x="260" y="80" width="100" height="80" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Gateway_0fdpu1z_di" bpmnElement="Gateway_0fdpu1z" isMarkerVisible="true"><dc:Bounds x="415" y="95" width="50" height="50" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1svpxg9_di" bpmnElement="Activity_1svpxg9"><dc:Bounds x="520" y="80" width="100" height="80" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1oop8ev_di" bpmnElement="Activity_1oop8ev"><dc:Bounds x="520" y="190" width="100" height="80" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0bge02e_di" bpmnElement="Event_0bge02e"><dc:Bounds x="682" y="102" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0yp1zwk_di" bpmnElement="Event_0yp1zwk"><dc:Bounds x="682" y="212" width="36" height="36" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="Flow_17bdcm9_di" bpmnElement="Flow_17bdcm9"><di:waypoint x="209" y="120" /><di:waypoint x="260" y="120" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_06ntpaq_di" bpmnElement="Flow_06ntpaq"><di:waypoint x="360" y="120" /><di:waypoint x="415" y="120" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_13uhr7d_di" bpmnElement="Flow_13uhr7d"><di:waypoint x="465" y="120" /><di:waypoint x="520" y="120" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0twa9kl_di" bpmnElement="Flow_0twa9kl"><di:waypoint x="440" y="145" /><di:waypoint x="440" y="230" /><di:waypoint x="520" y="230" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1utnfxr_di" bpmnElement="Flow_1utnfxr"><di:waypoint x="620" y="120" /><di:waypoint x="682" y="120" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1mt6jle_di" bpmnElement="Flow_1mt6jle"><di:waypoint x="620" y="230" /><di:waypoint x="682" y="230" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>'

      let testBpmn = transform.bpmnXml2Json(testBpmnXmlStr)

      const cells = []
      testBpmn.forEach((item) => {
        if (item.shape === 'bpmn:sequenceFlow') {
          cells.push(graph.createEdge(item))
        } else {
          cells.push(graph.createNode(item))
        }
      })
      graph.resetCells(cells)
      graph.zoomToFit({padding: 10, maxScale: 1})
    }
  }
}
</script>
