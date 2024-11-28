import React from 'react';
import parse, { Element } from 'html-react-parser';
import DOMPurify from 'dompurify';

const HTMLParser = (html: string) => {
  return parse(DOMPurify.sanitize(html), {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        const tempNode = domNode;
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