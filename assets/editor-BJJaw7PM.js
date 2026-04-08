import{o as e}from"./rolldown-runtime-Bhmf7a9N.js";import{E as t,K as n,O as r,X as i,x as a}from"./charts-DhkKBoYN.js";import{t as o}from"./_plugin-vue_export-helper-B67ILkmu.js";import{o as s}from"./vue-ecosystem-D1qosPQ9.js";import{$t as c}from"./main-DUqe5nMc.js";import{t as l}from"./prismeditor.esm-C5d0fAV7.js";import{r as u,t as d}from"./prism-Ddf5YkKJ.js";import{t as f}from"./js-Cpiuty-w.js";var p=e(f()),m=r({el:`#app`,mixins:[],props:{formatCode:{type:Boolean,required:!0}},components:{PrismEditor:l},data(){return{}},mounted:function(){this.current_model.xslt_data===``&&this.addExampleCode()},unmounted:function(){},watch:{formatCode(e){e&&this.initFormatting()}},methods:{isJSON(){let e=this.current_model.xslt_data.trim();return e.startsWith(`{`)&&e.endsWith(`}`)||e.startsWith(`[`)&&e.endsWith(`]`)},initFormatting(){if(this.isJSON()){this.formatJsonCode();return}this.formatXmlCode()},formatJsonCode(){try{this.current_model.xslt_data=p.default.js(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting JSON code:`,e)}},formatXmlCode(){try{this.current_model.xslt_data=p.default.html(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting XML code:`,e)}},highlighter(e){return d(e,u.markup,`markup`)},addExampleCode(){this.current_model.xslt_data=`
<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="xml" />
    <xsl:strip-space elements="*" />

    <xsl:template match="/document">
    <dokument>
        <filename><xsl:value-of select="filename" /></filename>
        <basic_info>
            <invoice_number><xsl:value-of select="fields_compact/invoice_id" /></invoice_number>
            <date><xsl:value-of select="fields_compact/invoice_date" /></date>
        </basic_info>
        <amounts>
            <net_amount><xsl:value-of select="fields_compact/net_amount" /></net_amount>
            <total_amount><xsl:value-of select="fields_compact/total_amount" /></total_amount>
        </amounts>
    </dokument>


    </xsl:template>

</xsl:stylesheet>`}},setup(){let{current_model:e,isReadOnly:t}=s(c());return{current_model:e,isReadOnly:t,formatOptions:{indent_size:4,indent_char:` `,eol:`
`,end_with_newline:!1,preserve_newlines:!0,max_preserve_newlines:2,indent_inner_html:!0,wrap_line_length:0,unformatted:[],extra_liners:[]}}}}),h={id:`app`};function g(e,r,o,s,c,l){let u=i(`prism-editor`);return n(),a(`div`,h,[t(u,{class:`special-rules-editor`,modelValue:this.current_model.xslt_data,"onUpdate:modelValue":r[0]||=e=>this.current_model.xslt_data=e,highlight:e.highlighter,"line-numbers":``,tabSize:4,readonly:e.isReadOnly},null,8,[`modelValue`,`highlight`,`readonly`])])}var _=o(m,[[`render`,g],[`__scopeId`,`data-v-4a202186`]]);export{_ as t};