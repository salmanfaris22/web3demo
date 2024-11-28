import React from 'react';
import parse, { Element } from 'html-react-parser';
import DOMPurify from 'dompurify';


export const getblogHeadId = (index :number)=> `blog-head-${index}`

const HTMLParser = (html: string) => {
  let index = 1;
  return parse(DOMPurify.sanitize(html), {
    replace: (domNode) => {
      const tempNode  = domNode as  Element ;
      if (
        tempNode.attribs?.class?.includes('ql-size-huge') ||
        tempNode.attribs?.class?.includes('ql-size-large')
      ) {
        tempNode.attribs = {
          ...tempNode.attribs,
          id: getblogHeadId(index), 
        };
        index++; 
      }
      if (domNode instanceof Element && domNode.name === 'a') {
     
        const domAttribs = domNode.attribs;
        tempNode.attribs = {
          ...domAttribs,
          ...{ target: '_blank', rel: 'noopener noreferrer' , className : 'text-ocean-blue' },
        };
        return tempNode;
      }
    },
  });
};

export default HTMLParser;