(self.webpackChunk_react_mol_docs=self.webpackChunk_react_mol_docs||[]).push([[893],{56487:function(n,e,t){"use strict";t.r(e),t.d(e,{frontMatter:function(){return u},contentTitle:function(){return d},metadata:function(){return m},toc:function(){return p},scope:function(){return k},default:function(){return x}});var a=t(7560),o=t(98283),r=(t(2784),t(30876)),i=t(18400),c=t(37015),s=t(1511),l=["components"],u={sidebar_position:3,sidebar_label:"Trunated"},d=void 0,m={unversionedId:"catan/Truncated",id:"catan/Truncated",isDocsHomePage:!1,title:"Truncated",description:"<Demo noInline {...scope}",source:"@site/examples/catan/Truncated.mdx",sourceDirName:"catan",slug:"/catan/Truncated",permalink:"/react-mol/examples/catan/Truncated",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"Trunated"},sidebar:"defaultSidebar",previous:{title:"Rhombic",permalink:"/react-mol/examples/catan/Rhombic"},next:{title:"SevenField",permalink:"/react-mol/examples/catan/SevenField"}},p=[],k={Text:c.x,Instanced:s.pY,Atom:s.hg,Honey:s.iq,Poly:s.LA},y={toc:p,scope:k};function x(n){var e=n.components,t=(0,o.Z)(n,l);return(0,r.kt)("wrapper",(0,a.Z)({},y,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)(i.B9,(0,a.Z)({noInline:!0},k,{x:{i:2,j:-2,k:-2,l:2},y:{i:2,j:-2,k:2,l:-2},z:{i:2,j:2,k:-2,l:-2},mdxType:"Demo"}),'render (\n  <Canvas>\n    <Instanced scale={[.5, .5, .5]}>\n      <meshPhysicalMaterial attach="material" color="darksalmon" roughness={.3} metalness={1}/>\n      <polyhedronGeometry args={[\n          [2, 1, 0,   2,-1, 0,   2, 0, 1,   2, 0,-1,\n          -2, 1, 0,  -2,-1, 0,  -2, 0, 1,  -2, 0,-1,\n           1, 2, 0,  -1, 2, 0,   0, 2, 1,   0, 2,-1,\n           1,-2, 0,  -1,-2, 0,   0,-2, 1,   0,-2,-1,\n           1, 0, 2,  -1, 0, 2,   0, 1, 2,   0,-1, 2,\n           1, 0,-2,  -1, 0,-2,   0, 1,-2,   0,-1,-2],\n          [0, 2, 1,   0, 1, 3,   4, 5, 6,   4, 7, 5, // \u23f9: 0, 1, 2, 3, 4, 5, 6, 7,\n           8, 9,10,   8,11, 9,  12,14,13,  12,13,15, // \u23f9: 8, 9,10,11,12,13,14,15,\n          16,17,19,  16,18,17,  20,21,22,  20,23,21, // \u23f9:16,17,18,19,20,21,22,23,\n           0, 8, 2,   2, 8,16,   8,10,16,  10,18,16, // \ud83d\udd2f: 0, 2, 8,10,16,18,\n           1, 2,16,   1,16,12,  12,16,19,  12,19,14, // \ud83d\udd2f: 1, 2,12,14,16,19,\n           1,12, 3,   3,12,20,  12,15,20,  15,23,20, // \ud83d\udd2f: 1, 3,12,15,20,23,\n           0, 3,20,   0,20, 8,   8,20,22,   8,22,11, // \ud83d\udd2f: 0, 3, 8,11,20,22,\n           4, 6,17,   4,17, 9,   9,17,18,   9,18,10, // \ud83d\udd2f: 4, 6, 9,10,17,18,\n           5,13, 6,   6,13,17,  13,14,17,  14,19,17, // \ud83d\udd2f: 5, 6,13,14,17,19,\n           4, 9, 7,   7, 9,21,   9,11,21,  11,22,21, // \ud83d\udd2f: 4, 7, 9,11,21,22,\n           5, 7,21,   5,21,13,  13,21,23,  13,23,15],// \ud83d\udd2f: 5, 7,13,15,21,23,\n           Math.sqrt(5)\n      ]}/>\n      <Poly n={7} args={[[0, 0, 0, 0], 0]}>\n        {(next, _, floor, key) =>\n          <Honey {...{floor, key}}>\n            {([i, j, k, l], key) =>\n              <group key={key}>\n                {next([i, j, k, l], key) ||\n                <Atom key={key} position={[\n                  x.i*i+x.j*j+x.k*k+x.l*l,\n                  y.i*i+y.j*j+y.k*k+y.l*l,\n                  z.i*i+z.j*j+z.k*k+z.l*l]}/>\n                }\n             </group>\n            }\n          </Honey>\n        }\n      </Poly>\n    </Instanced>\n</Canvas>\n)'))}x.isMDXComponent=!0}}]);