(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`3390d14bcd1af43decb4f030b27a3c4b7506e62d`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`94d63bd0-d0e4-4453-9d08-81f7c3d0544a`,e._sentryDebugIdIdentifier=`sentry-dbid-94d63bd0-d0e4-4453-9d08-81f7c3d0544a`)}catch{}})();import{o as e}from"./rolldown-runtime.vdkqs_2r.js";import{Gt as t,It as n,Xt as r,mn as i,un as a}from"./api-config.CFWsyg7b.js";import{Tf as o,af as s,dr as c}from"./app-core.CBON8GI7.js";import{t as l}from"./js.Cq3pY5jN.js";import{t as u}from"./CodeEditor.C1H2EdS9.js";var d=e(l());r();var f=t({components:{CodeEditor:u},props:{formatCode:{type:Boolean,required:!0}},emits:[`formatComplete`],data(){return{exampleXslt:``,wrapEnabled:!0}},mounted(){this.initializeEditor()},computed:{xsltData:{get(){return this.current_model.xslt_data||``},set(e){this.current_model.xslt_data=e}},editorLanguage(){return this.isJsonContent()?`json`:`xml`}},watch:{formatCode(e){e&&this.initFormatting()}},methods:{initializeEditor(){this.exampleXslt=this.buildExampleXslt()},isJsonContent(){let e=(this.current_model.xslt_data||``).trim();return e.startsWith(`{`)&&e.endsWith(`}`)||e.startsWith(`[`)&&e.endsWith(`]`)},initFormatting(){this.wrapEnabled=!1,this.isJsonContent()?this.formatJsonCode():this.formatXmlCode()},formatJsonCode(){try{this.current_model.xslt_data=d.default.js(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting JSON code:`,e)}},formatXmlCode(){try{this.current_model.xslt_data=d.default.html(this.current_model.xslt_data,{...this.formatOptions}),this.$emit(`formatComplete`,!1)}catch(e){logError(`Error formatting XML code:`,e)}},buildExampleXslt(){return`<?xml version="1.0" encoding="UTF-8"?>

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

</xsl:stylesheet>`}},setup(){let e=c(),{current_model:t,isReadOnly:n}=s(e);return{current_model:t,isReadOnly:n,formatOptions:{indent_size:4,indent_char:` `,eol:`
`,end_with_newline:!1,preserve_newlines:!0,max_preserve_newlines:2,indent_inner_html:!0,wrap_line_length:0,unformatted:[],extra_liners:[]}}}});function p(e,t,r,o,s,c){let l=i(`CodeEditor`);return a(),n(l,{modelValue:e.xsltData,"onUpdate:modelValue":t[0]||=t=>e.xsltData=t,language:e.editorLanguage,"read-only":e.isReadOnly,placeholder:e.exampleXslt,wrap:e.wrapEnabled,ref:`codeEditor`},null,8,[`modelValue`,`language`,`read-only`,`placeholder`,`wrap`])}var m=o(f,[[`render`,p]]);export{m as t};