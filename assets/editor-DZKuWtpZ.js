import{_ as s,d as a,s as n,C as d,c as p,o as c,b as m}from"./index-CYwpIJ_g.js";import{u as l}from"./script.store-D7gpIEBK.js";import{P as o}from"./prism-Cx9ArtRy.js";import{P as _}from"./prismeditor.esm-Ba3TzS2K.js";/* empty css                        */import{b as u}from"./index-BYyg8C7N.js";const h=a({el:"#app",mixins:[],props:{formatCode:{type:Boolean,required:!0}},components:{PrismEditor:_},data(){return{}},mounted:function(){window.pyCodeEditor=this,this.current_model.script_data===""&&this.addExampleCode()},unmounted:function(){},watch:{current_model:{handler:function(e,t){e.script_data===""&&this.addExampleCode()}},formatCode(e){e&&this.formatCodeScript()}},methods:{async formatCodeScript(){try{this.current_model.script_data=await u(this.current_model.script_data,{indent_size:4,indent_char:" ",preserve_newlines:!0}),this.$emit("formatComplete",!1)}catch(e){logError("Error formatting Python code:",e)}},highlighter(e){return o.highlight(String(e),o.languages.python,"python")},addExampleCode(){this.current_model.script_data=`
# This is an Example Code
def median(pool):
    copy = sorted(pool)
    size = len(copy)
    if size % 2 == 1:
        return copy[(size - 1) / 2]
    else:
        return (copy[size/2 - 1] + copy[size/2]) / 2
if __name__ == '__main__':
    import doctest
    doctest.testmod()
      `}},setup(){const e=l(),{current_model:t}=n(e);return{current_model:t}}}),f={id:"app"};function g(e,t,y,C,E,b){const r=d("prism-editor");return c(),p("div",f,[m(r,{class:"special-rules-editor",modelValue:this.current_model.script_data,"onUpdate:modelValue":t[0]||(t[0]=i=>this.current_model.script_data=i),highlight:e.highlighter,"line-numbers":"",tabSize:4},null,8,["modelValue","highlight"])])}const $=s(h,[["render",g],["__scopeId","data-v-9bb99a21"]]);export{$ as e};
