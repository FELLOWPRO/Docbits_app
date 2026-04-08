import{o as e}from"./rolldown-runtime-Bhmf7a9N.js";import{E as t,K as n,O as r,X as i,x as a}from"./charts-DhkKBoYN.js";import{t as o}from"./_plugin-vue_export-helper-B67ILkmu.js";import{o as s}from"./vue-ecosystem-D1qosPQ9.js";import{on as c}from"./main-CTAoMJgr.js";import{t as l}from"./prismeditor.esm-C5d0fAV7.js";import{r as u,t as d}from"./prism-Ddf5YkKJ.js";import{t as f}from"./js-Cpiuty-w.js";var p=e(f()),m=r({el:`#app`,mixins:[],props:{formatCode:{type:Boolean,required:!0},makeReadOnly:{type:Boolean,required:!0}},components:{PrismEditor:l},data(){return{}},mounted:function(){window.pyCodeEditor=this,this.current_model.script_data===``&&this.addExampleCode()},unmounted:function(){},watch:{current_model:{handler:function(e,t){e.script_data===``&&this.addExampleCode()}},formatCode(e){e&&this.formatCodeScript()}},methods:{async formatCodeScript(){try{this.current_model.script_data=await(0,p.default)(this.current_model.script_data,{indent_size:4,indent_char:` `,preserve_newlines:!0}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting Python code:`,e)}},highlighter(e){return d(e,u.python,`python`)},addExampleCode(){this.current_model.script_data=`##########################################################################
# Author: [Person Name]
# Date Created: [Date/Time]
# Date Updated: [Date/Time]
# Ticket Number: [FELLOWPRO Jira Ticket Number]
# Script Description: [Description of the script]
#
#
# Change History:
# ------------------------------------------------------------------------
# Date        | Author    | Ticket ID | Description
# 2024-05-10  | John Doe  | INC-12345 | Initial script creation
# 2024-06-01  | Jane Smith| CHG-67890 | Added log rotation logic
# ------------------------------------------------------------------------
##########################################################################

po_number = get_field_value(document_data, 'purchase_order', None)
if not po_number:
    po_number = ''

      `}},setup(){let{current_model:e}=s(c());return{current_model:e}}}),h={id:`app`};function g(e,r,o,s,c,l){let u=i(`prism-editor`);return n(),a(`div`,h,[t(u,{class:`special-rules-editor`,modelValue:this.current_model.script_data,"onUpdate:modelValue":r[0]||=e=>this.current_model.script_data=e,highlight:e.highlighter,"line-numbers":``,tabSize:4,readonly:e.makeReadOnly},null,8,[`modelValue`,`highlight`,`readonly`])])}var _=o(m,[[`render`,g],[`__scopeId`,`data-v-b16b687f`]]);export{_ as t};